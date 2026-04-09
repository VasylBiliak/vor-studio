import { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import {
  setLanguage,
  initializeLanguage,
  selectLanguage,
  selectLanguages,
  selectDefaultLanguage,
  selectTranslations,
  selectIsLoading,
  selectIsLoaded,
  selectError,
} from '@/store/slices/i18nSlice';
import { LanguageCode, isValidLanguage } from '@/utils/i18n';

/**
 * Translation hook return type
 */
interface UseTranslationReturn {
  /** Current language code */
  lang: LanguageCode;

  /** Translation function - returns string for given key */
  t: (key: string) => string;

  /** Set active language */
  setLang: (lang: LanguageCode) => void;

  /** Available languages from CSV */
  availableLanguages: LanguageCode[];

  /** Default language from CSV */
  defaultLanguage: LanguageCode;

  /** Currency code from CSV (e.g., 'USD', 'UAH') with fallback */
  currency: string;

  /** Whether translations are currently loading */
  isLoading: boolean;

  /** Whether translations have been loaded */
  isLoaded: boolean;

  /** Any error that occurred during loading */
  error: string | null;

  /** Initialize language from localStorage (call once on mount) */
  initLang: () => void;
}

/**
 * Custom hook for translations
 *
 * Usage:
 * const { t, lang, setLang } = useTranslation();
 * <button>{t("add_to_cart")}</button>
 */
export const useTranslation = (): UseTranslationReturn => {
  const dispatch = useDispatch<AppDispatch>();

  // Selectors
  const language = useSelector(selectLanguage);
  const languages = useSelector(selectLanguages);
  const defaultLanguage = useSelector(selectDefaultLanguage);
  const translations = useSelector(selectTranslations);
  const isLoading = useSelector(selectIsLoading);
  const isLoaded = useSelector(selectIsLoaded);
  const error = useSelector(selectError);

  /**
   * Translation function with dynamic fallback chain:
   * 1. Requested/current language
   * 2. Default language (from CSV, e.g., 'en' or first available)
   * 3. Empty string during loading (prevents key flicker)
   * 4. Key itself (last resort, only when loaded)
   */
  const t = useCallback(
    (key: string): string => {
      const normalizedKey = key.toLowerCase().trim();

      // Try current language
      if (translations[language]?.[normalizedKey]) {
        return translations[language][normalizedKey];
      }

      // Fallback to default language
      if (translations[defaultLanguage]?.[normalizedKey]) {
        return translations[defaultLanguage][normalizedKey];
      }

      // Try any available language as last resort
      for (const lang of languages) {
        if (translations[lang]?.[normalizedKey]) {
          return translations[lang][normalizedKey];
        }
      }

      // During loading phase, return empty string to prevent key flicker
      if (!isLoaded) {
        return "";
      }

      // Return key as last resort when loaded (helps identify missing translations)
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Translation missing for key: "${normalizedKey}"`);
      }

      return key;
    },
    [language, translations, defaultLanguage, languages, isLoaded]
  );

  /**
   * Set language with validation against available languages
   */
  const setLang = useCallback(
    (newLang: LanguageCode) => {
      if (isValidLanguage(newLang, languages)) {
        dispatch(setLanguage(newLang));
      } else {
        console.warn(`Invalid language: ${newLang}. Available: ${languages.join(', ')}`);
      }
    },
    [dispatch, languages]
  );

  /**
   * Initialize language from localStorage
   * Call this once in your app initialization (e.g., in Providers or layout)
   */
  const initLang = useCallback(() => {
    dispatch(initializeLanguage());
  }, [dispatch]);

  /**
   * Get currency with fallback chain:
   * 1. Current language currency
   * 2. Default language currency
   * 3. 'USD' as ultimate fallback
   */
  const currency = useMemo(() => {
    // Try current language
    const currentCurrency = translations[language]?.['currency'];
    if (currentCurrency) return currentCurrency;

    // Fallback to default language
    const defaultCurrency = translations[defaultLanguage]?.['currency'];
    if (defaultCurrency) return defaultCurrency;

    // Ultimate fallback
    return 'USD';
  }, [translations, language, defaultLanguage]);

  return useMemo(
    () => ({
      lang: language,
      t,
      setLang,
      availableLanguages: languages,
      defaultLanguage,
      currency,
      isLoading,
      isLoaded,
      error,
      initLang,
    }),
    [language, t, setLang, languages, defaultLanguage, currency, isLoading, isLoaded, error, initLang]
  );
};

export default useTranslation;
