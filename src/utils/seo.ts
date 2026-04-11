import Papa from 'papaparse';

/**
 * SEO data structure: { [language]: { [key]: value } }
 */
export type SeoData = Record<string, Record<string, string>>;

/**
 * SEO CSV sheet URL
 * Source: https://docs.google.com/spreadsheets/d/e/2PACX-1vTod5vKdR--_HQ60J4hbJm8d1m2cMsWwzmMsqwQvfwalkVknhuVsXGpfUOGKZ-4ZbWysPgFaOxQ19pl/pub?gid=583708081&single=true&output=csv
 */
const SEO_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTod5vKdR--_HQ60J4hbJm8d1m2cMsWwzmMsqwQvfwalkVknhuVsXGpfUOGKZ-4ZbWysPgFaOxQ19pl/pub?gid=583708081&single=true&output=csv';

// Cache for SEO data
let seoCache: SeoData | null = null;
let seoLanguagesCache: string[] | null = null;
let seoDefaultLanguageCache: string | null = null;

/**
 * Fetches and parses SEO data from the CSV source
 * Returns structured SEO object with dynamic languages
 */
export const fetchSeoData = async (): Promise<{
  seoData: SeoData;
  languages: string[];
  defaultLanguage: string;
}> => {
  try {
    const response = await fetch(SEO_SHEET_URL, {
      next: { revalidate: 3600 }, // Revalidate every hour for static generation
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const csvText = await response.text();
    const parsed = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    if (!parsed.data || parsed.data.length === 0) {
      throw new Error('Empty SEO data');
    }

    // Build SEO structure from CSV
    const seoData: SeoData = {};
    const rows = parsed.data as Record<string, string>[];

    // First row contains language codes as column names
    // First column is the key
    const columns = Object.keys(rows[0]);
    const languages = columns.filter((col) => col.toLowerCase() !== 'key');

    if (languages.length === 0) {
      throw new Error('No language columns found in SEO CSV');
    }

    // Determine default language: 'en' if exists, otherwise first available
    const defaultLanguage = languages.includes('en') ? 'en' : languages[0];

    // Initialize language objects
    languages.forEach((lang) => {
      seoData[lang] = {};
    });

    // Populate SEO data
    rows.forEach((row) => {
      const key = row[columns[0]]?.trim().toLowerCase().replace(/\s+/g, '_');
      if (!key) return;

      languages.forEach((lang) => {
        const value = row[lang]?.trim();
        if (value) {
          seoData[lang][key] = value;
        }
      });
    });

    // Cache the result
    seoCache = seoData;
    seoLanguagesCache = languages;
    seoDefaultLanguageCache = defaultLanguage;

    return {
      seoData,
      languages,
      defaultLanguage,
    };
  } catch (error) {
    console.warn('Failed to load SEO data from CSV:', error);

    // Return empty structure as fallback
    return {
      seoData: {},
      languages: ['en'],
      defaultLanguage: 'en',
    };
  }
};

/**
 * Get SEO value for a specific key and language
 * Uses dynamic fallback chain: requested language -> default language -> key itself
 *
 * @param seoData - The SEO data object
 * @param key - The SEO key (e.g., 'home_title', 'product_description')
 * @param lang - The requested language code
 * @param defaultLang - The default language code for fallback
 * @returns The SEO value string
 *
 * @example
 * getSeo(seoData, 'home_title', 'en', 'en') // "Best Store"
 * getSeo(seoData, 'home_title', 'ua', 'en') // Falls back to 'en' if 'ua' not available
 */
export const getSeo = (
  seoData: SeoData,
  key: string,
  lang: string,
  defaultLang: string
): string => {
  const normalizedKey = key.toLowerCase().trim().replace(/\s+/g, '_');

  // Try requested language
  if (seoData[lang]?.[normalizedKey]) {
    return seoData[lang][normalizedKey];
  }

  // Fallback to default language
  if (seoData[defaultLang]?.[normalizedKey]) {
    return seoData[defaultLang][normalizedKey];
  }

  // Try any available language as last resort
  for (const language of Object.keys(seoData)) {
    if (seoData[language]?.[normalizedKey]) {
      return seoData[language][normalizedKey];
    }
  }

  // Return empty string as last resort (prevents displaying raw keys to users)
  return '';
};

/**
 * Get cached SEO data (for client-side use after initial fetch)
 */
export const getCachedSeoData = (): SeoData | null => {
  return seoCache;
};

/**
 * Get cached SEO languages
 */
export const getCachedSeoLanguages = (): string[] | null => {
  return seoLanguagesCache;
};

/**
 * Get cached default SEO language
 */
export const getCachedSeoDefaultLanguage = (): string | null => {
  return seoDefaultLanguageCache;
};

/**
 * Clear the SEO cache (useful for testing or forced reload)
 */
export const clearSeoCache = (): void => {
  seoCache = null;
  seoLanguagesCache = null;
  seoDefaultLanguageCache = null;
};

/**
 * Generate full metadata object for Next.js App Router
 *
 * @param seoData - The SEO data object
 * @param lang - Current language
 * @param defaultLang - Default language
 * @param pageKey - Page identifier (e.g., 'home', 'product', 'cart', 'about')
 * @param options - Additional metadata options
 * @returns Next.js Metadata object
 */
export const generateSeoMetadata = (
  seoData: SeoData,
  lang: string,
  defaultLang: string,
  pageKey: string,
  options?: {
    pathname?: string;
    baseUrl?: string;
    ogImage?: string;
  }
) => {
  const titleKey = `${pageKey}_title`;
  const descriptionKey = `${pageKey}_description`;

  const title = getSeo(seoData, titleKey, lang, defaultLang);
  const description = getSeo(seoData, descriptionKey, lang, defaultLang);

  const baseUrl = options?.baseUrl || 'https://vor-studio.com';
  const pathname = options?.pathname || '/';
  const canonicalUrl = `${baseUrl}${pathname}`;

  // Locale mapping for hreflang
  const localeMap: Record<string, string> = {
    en: 'en-US',
    ua: 'uk-UA',
    uk: 'uk-UA',
    es: 'es-ES',
    de: 'de-DE',
    fr: 'fr-FR',
  };

  const availableLanguages = Object.keys(seoData);

  // Build alternates for hreflang
  const alternates: Record<string, string> = {};
  availableLanguages.forEach((language) => {
    const locale = localeMap[language] || language;
    alternates[locale] = `${baseUrl}${pathname}?lang=${language}`;
  });

  // Get keywords
  const keywords = getSeo(seoData, 'meta_keywords', lang, defaultLang);
  const ogImage = getSeo(seoData, 'og_image', lang, defaultLang);

  return {
    title,
    description,
    ...(keywords && { keywords }),
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      locale: localeMap[lang] || lang,
      type: 'website',
      images: [
        {
          url: ogImage || options?.ogImage || `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
      images: [
        ogImage || options?.ogImage || `${baseUrl}/og-image.jpg`,
      ],
    },
  };
};

/**
 * Page identifier type for type safety
 */
export type PageKey =
  | 'home'
  | 'category'
  | 'product'
  | 'cart'
  | 'checkout'
  | 'about'
  | 'contact';

/**
 * Build metadata for a specific page
 * Centralized helper for generating page metadata with fallback support
 *
 * @param seoData - The SEO data object
 * @param page - Page identifier (e.g., 'home', 'product', 'cart')
 * @param lang - Current language code
 * @param defaultLang - Default language code for fallback
 * @param options - Additional options for metadata generation
 * @returns Next.js Metadata object
 *
 * @example
 * buildMetadata(seoData, 'home', 'en', 'en')
 * // Returns: { title: '...', description: '...', keywords: '...' }
 *
 * buildMetadata(seoData, 'product', 'en', 'en', { titlePrefix: 'Product Name' })
 * // Returns: { title: 'Product Name | Product Title', ... }
 */
export const buildMetadata = (
  seoData: SeoData,
  page: PageKey,
  lang: string,
  defaultLang: string,
  options?: {
    titlePrefix?: string;
    pathname?: string;
    baseUrl?: string;
    ogImage?: string;
  }
) => {
  const titleKey = `${page}_title`;
  const descriptionKey = `${page}_description`;

  // Get raw values from SEO data
  let title = getSeo(seoData, titleKey, lang, defaultLang);
  let description = getSeo(seoData, descriptionKey, lang, defaultLang);

  // Fallback to home page SEO if page-specific values are missing
  if (!title) {
    title = getSeo(seoData, 'home_title', lang, defaultLang);
  }
  if (!description) {
    description = getSeo(seoData, 'home_description', lang, defaultLang);
  }

  // Apply title prefix if provided (e.g., for product pages: "Product Name | Title")
  if (options?.titlePrefix && title) {
    title = `${options.titlePrefix} | ${title}`;
  }

  // Get keywords (global for all pages)
  const keywords = getSeo(seoData, 'meta_keywords', lang, defaultLang);

  // Build base URL and canonical
  const baseUrl = options?.baseUrl || 'https://vor-studio.com';
  const pathname = options?.pathname || '/';
  const canonicalUrl = `${baseUrl}${pathname}`;

  // Locale mapping for OpenGraph
  const localeMap: Record<string, string> = {
    en: 'en-US',
    ua: 'uk-UA',
    uk: 'uk-UA',
    es: 'es-ES',
    de: 'de-DE',
    fr: 'fr-FR',
  };

  // Build language alternates for SEO
  const availableLanguages = Object.keys(seoData);
  const alternates: Record<string, string> = {};
  availableLanguages.forEach((language) => {
    const locale = localeMap[language] || language;
    alternates[locale] = `${baseUrl}${pathname}?lang=${language}`;
  });

  return {
    title,
    description,
    ...(keywords && { keywords }),
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      locale: localeMap[lang] || lang,
      type: 'website',
      ...(options?.ogImage && { images: [{ url: options.ogImage }] }),
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
      ...(options?.ogImage && { images: [options.ogImage] }),
    },
  };
};
