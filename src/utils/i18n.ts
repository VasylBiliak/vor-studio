import Papa from 'papaparse';

/**
 * Language code type - dynamic based on CSV
 */
export type LanguageCode = string;

/**
 * Translation record structure: { [language]: { [key]: value } }
 */
export type Translations = Record<LanguageCode, Record<string, string>>;

/**
 * Result from fetching translations
 */
export interface TranslationsResult {
  translations: Translations;
  languages: LanguageCode[];
  defaultLanguage: LanguageCode;
}

const TRANSLATIONS_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTod5vKdR--_HQ60J4hbJm8d1m2cMsWwzmMsqwQvfwalkVknhuVsXGpfUOGKZ-4ZbWysPgFaOxQ19pl/pub?gid=1916397784&single=true&output=csv';

// Fallback translations in case CSV fails to load
const FALLBACK_TRANSLATIONS: Translations = {
  en: {
    // Currency
    currency: 'USD',

    // Cart
    cart_title: 'Cart',
    cart_empty_title: 'Your cart is empty',
    cart_empty_message: 'Add items to your cart to continue shopping',
    continue_shopping: 'Continue Shopping',
    clear_cart: 'Clear Cart',
    order_summary: 'Order Summary',
    items_count: 'Items',
    shipping: 'Shipping',
    shipping_calculated: 'Calculated at checkout',
    total: 'Total',
    checkout: 'Checkout',
    remove_from_cart: 'Remove from cart',
    decrease_quantity: 'Decrease quantity',
    increase_quantity: 'Increase quantity',
    add_to_cart: 'Add to Cart',
    select_size: 'Please select a size',

    // Product
    product_not_found: 'Product not found',
    back_to_home: 'Back to Home',
    size_guide: 'Size Guide',
    size_guide_content:
      'Unsure about sizing? Use our detailed measurement chart or contact us.',
    shipping_returns: 'Shipping & Returns',
    shipping_returns_content:
      'Ships within 10-14 business days after payment. Within Ukraine — Nova Poshta, international — Global Shipping. Returns accepted within 14 days of receipt if the item remains in good condition.',
    you_may_also_like: 'You may also like',
    store: 'Store',
    catalog: 'Catalog',

    // Header
    welcome_bonus: 'WELCOME BONUS: FREE SHIPPING ON ORDERS OVER 50',
    logo_text_first_part: 'VOR',
    logo_text_second_part: 'STUDIO',

    // Products Grid
    see_more: 'See more',
    no_products_found: 'No products found in this category',

    // Navigation
    contact_nav: 'Contact',

    // About
    about_title: 'About VOR STUDIO',
    about_subtitle:
      'A conceptual clothing brand that combines Ukrainian heritage with modern global trends',

    // Contact
    contact_title: 'Contact Us',
    contact_description: 'Get in touch with us. We\'d love to hear from you.',
    contact_form_name: 'Name',
    contact_form_email: 'Email',
    contact_form_message: 'Message',
    contact_submit: 'Send Message',
    contact_success_title: 'Message Sent',
    contact_success_description: 'Thank you for reaching out! We have received your message and will get back to you soon.',
    contact_success_button: 'OK',
    contact_error_required: 'This field is required',
    contact_error_email: 'Please enter a valid email address',
    our_story: 'Our Story',
    our_philosophy: 'Our Philosophy',
    design: 'Design',
    design_desc: 'Unique design that blends tradition with innovation',
    quality: 'Quality',
    quality_desc: 'Made in Ukraine from the finest materials',
    sustainability: 'Sustainability',
    sustainability_desc: 'Sustainable production and responsible consumption',
    our_team: 'Our Team',
    full_name: 'Full Name',
    position: 'Position at company',
    join_community: 'Join Our Community',
    view_collection: 'View Collection',
    contact_us: 'Contact Us',

    // Categories
    all: 'All',
    new: 'New',
    sale: 'Sale',

    // Footer
    working_hours: 'Working Hours',
    working_hours_value: 'Mon-Fri: 9:00 - 18:00',
    monday_friday: 'Monday – Friday',
    weekday_hours: '08:00 am – 12:00 am',
    saturday_sunday: 'Saturday – Sunday',
    weekend_hours: '10:00 am – 12:00 am',
    text_address: '159 King St, Toronto, ON M5V 1M1, Canada',
    contact_phone: '1 416-555-0198',
    contact_email: 'contact@b.com',
    logo_img_url: 'https://placehold.co/200x100?text=VOR+STUDIO',
    map_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.2638541315535!2d-79.3892416!3d43.6473663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34d109f07ab7%3A0x79669573f0868f9a!2s159%20King%20St%20W%2C%20Toronto%2C%20ON%20M5V%203M4!5e0!3m2!1sen!2sca!4v1712490000000!5m2!1sen!2sca',
    footer_tagline: 'The secret of success is to treat every guest as if they were a member of your own family',
    all_rights_reserved: 'All rights reserved',
    social_facebook: 'Follow us on Facebook',
    social_instagram: 'Follow us on Instagram',
    social_telegram: 'Join us on Telegram',

    // Cart Popup
    added_to_cart: 'Added to cart',
    view_cart: 'View Cart',
    just_added: 'Just added to your cart',
    items_in_cart: 'items in cart',

    // Hero
    welcome_to: 'Welcome to ...',
    end_season_sale: 'END OF SEASON SALE!',
    sale_description: 'Big savings on select items. Up to 70% off!',
    shop_deals: 'Click here to shop deals',
  },
};

let translationsCache: Translations | null = null;
let availableLanguagesCache: LanguageCode[] | null = null;
let defaultLanguageCache: LanguageCode | null = null;

/**
 * Fetches and parses translations from the CSV source
 * Returns structured translations object with dynamic languages
 */
export const fetchTranslations = async (): Promise<TranslationsResult> => {
  try {
    const response = await fetch(TRANSLATIONS_SHEET_URL, {
      cache: 'no-store',
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
      throw new Error('Empty translations data');
    }

    // Build translations structure from CSV
    const translations: Translations = {};
    const rows = parsed.data as Record<string, string>[];

    // First row contains language codes as column names
    // First column is the key
    const columns = Object.keys(rows[0]);
    const languages = columns.filter((col) => col.toLowerCase() !== 'key');

    if (languages.length === 0) {
      throw new Error('No language columns found in CSV');
    }

    // Determine default language: 'en' if exists, otherwise first available
    const defaultLanguage = languages.includes('en') ? 'en' : languages[0];

    // Initialize language objects
    languages.forEach((lang) => {
      translations[lang] = {};
    });

    // Populate translations
    rows.forEach((row) => {
      const key = row[columns[0]]?.trim().toLowerCase().replace(/\s+/g, '_');
      if (!key) return;

      languages.forEach((lang) => {
        const value = row[lang]?.trim();
        if (value) {
          translations[lang][key] = value;
        }
      });
    });

    // Merge with fallback for default language only
    const mergedTranslations: Translations = { ...translations };
    if (FALLBACK_TRANSLATIONS[defaultLanguage]) {
      mergedTranslations[defaultLanguage] = {
        ...FALLBACK_TRANSLATIONS[defaultLanguage],
        ...translations[defaultLanguage],
      };
    }

    const result: TranslationsResult = {
      translations: mergedTranslations,
      languages,
      defaultLanguage,
    };

    // Cache the result
    translationsCache = mergedTranslations;
    availableLanguagesCache = languages;
    defaultLanguageCache = defaultLanguage;

    return result;
  } catch (error) {
    console.warn('Failed to load translations from CSV, using fallback:', error);

    // Fallback: extract languages from fallback translations
    const fallbackLanguages = Object.keys(FALLBACK_TRANSLATIONS);
    const fallbackDefault = fallbackLanguages.includes('en') ? 'en' : fallbackLanguages[0] || 'en';

    return {
      translations: FALLBACK_TRANSLATIONS,
      languages: fallbackLanguages,
      defaultLanguage: fallbackDefault,
    };
  }
};

/**
 * Clears the translations cache (useful for testing or forced reload)
 */
export const clearTranslationsCache = (): void => {
  translationsCache = null;
  availableLanguagesCache = null;
  defaultLanguageCache = null;
};

/**
 * Get cached available languages
 */
export const getAvailableLanguages = (): LanguageCode[] | null => {
  return availableLanguagesCache;
};

/**
 * Get cached default language
 */
export const getDefaultLanguage = (): LanguageCode | null => {
  return defaultLanguageCache;
};

/**
 * Validates if a string is a supported language
 * Must be called after fetchTranslations to have up-to-date data
 */
export const isValidLanguage = (lang: string, availableLangs?: LanguageCode[]): boolean => {
  const languages = availableLangs || availableLanguagesCache;
  if (!languages) return false;
  return languages.includes(lang);
};

