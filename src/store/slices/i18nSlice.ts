import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchTranslations,
  Translations,
  LanguageCode,
  isValidLanguage,
  TranslationsResult,
} from '@/utils/i18n';

/**
 * Interface for i18n slice state
 */
interface I18nState {
  language: LanguageCode;
  languages: LanguageCode[];
  defaultLanguage: LanguageCode;
  translations: Translations;
  isLoading: boolean;
  isLoaded: boolean;
  error: string | null;
}

/**
 * Default/fallback language - will be updated dynamically after loading
 */
const DEFAULT_LANGUAGE: LanguageCode = 'en';

/**
 * Get initial language from localStorage or default
 */
const getInitialLanguage = (availableLangs?: LanguageCode[], defaultLang?: LanguageCode): LanguageCode => {
  if (typeof window !== 'undefined') {
    const savedLang = localStorage.getItem('i18n_language');
    if (savedLang) {
      // Check against provided available languages or allow any non-empty string
      const isValid = availableLangs ? isValidLanguage(savedLang, availableLangs) : savedLang.length > 0;
      if (isValid) {
        return savedLang;
      }
    }
  }
  return defaultLang || DEFAULT_LANGUAGE;
};

/**
 * Async thunk to load translations from CSV
 */
export const loadTranslations = createAsyncThunk<
  TranslationsResult,
  void,
  { rejectValue: string }
>('i18n/loadTranslations', async (_, { rejectWithValue }) => {
  try {
    const result = await fetchTranslations();
    return result;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to load translations');
  }
});

/**
 * Initial state with safe defaults
 */
const initialState: I18nState = {
  language: DEFAULT_LANGUAGE,
  languages: [DEFAULT_LANGUAGE],
  defaultLanguage: DEFAULT_LANGUAGE,
  translations: {},
  isLoading: false,
  isLoaded: false,
  error: null,
};

/**
 * i18n Redux slice
 */
const i18nSlice = createSlice({
  name: 'i18n',
  initialState,
  reducers: {
    /**
     * Set the current language
     */
    setLanguage: (state, action: PayloadAction<LanguageCode>) => {
      const newLang = action.payload;
      // Validate against available languages in state
      if (state.languages.includes(newLang)) {
        state.language = newLang;
        // Persist to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('i18n_language', newLang);
        }
      }
    },

    /**
     * Initialize language from storage (call on app mount)
     * Should be called after translations are loaded to have access to available languages
     */
    initializeLanguage: (state) => {
      const lang = getInitialLanguage(state.languages, state.defaultLanguage);
      state.language = lang;
    },

    /**
     * Set available languages (typically called after loading translations)
     */
    setLanguages: (state, action: PayloadAction<LanguageCode[]>) => {
      state.languages = action.payload;
    },

    /**
     * Set default language
     */
    setDefaultLanguage: (state, action: PayloadAction<LanguageCode>) => {
      state.defaultLanguage = action.payload;
    },

    /**
     * Clear any error state
     */
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTranslations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        loadTranslations.fulfilled,
        (state, action: PayloadAction<TranslationsResult>) => {
          state.isLoading = false;
          state.isLoaded = true;
          state.translations = action.payload.translations;
          state.languages = action.payload.languages;
          state.defaultLanguage = action.payload.defaultLanguage;

          // If current language is not in available languages, switch to default
          if (!action.payload.languages.includes(state.language)) {
            state.language = action.payload.defaultLanguage;
          }

          // Initialize language from localStorage if valid
          if (typeof window !== 'undefined') {
            const savedLang = localStorage.getItem('i18n_language');
            if (savedLang && action.payload.languages.includes(savedLang)) {
              state.language = savedLang;
            }
          }
        }
      )
      .addCase(loadTranslations.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoaded = true; // Mark as loaded to show UI with fallback translations
        state.error = action.payload as string;
      });
  },
});

/**
 * Export actions
 */
export const { setLanguage, initializeLanguage, setLanguages, setDefaultLanguage, clearError } = i18nSlice.actions;

/**
 * Export reducer
 */
export default i18nSlice.reducer;

/**
 * Selectors
 */
export const selectLanguage = (state: { i18n: I18nState }): LanguageCode =>
  state.i18n.language;

export const selectLanguages = (state: { i18n: I18nState }): LanguageCode[] =>
  state.i18n.languages;

export const selectDefaultLanguage = (state: { i18n: I18nState }): LanguageCode =>
  state.i18n.defaultLanguage;

export const selectTranslations = (state: { i18n: I18nState }): Translations =>
  state.i18n.translations;

export const selectIsLoading = (state: { i18n: I18nState }): boolean =>
  state.i18n.isLoading;

export const selectIsLoaded = (state: { i18n: I18nState }): boolean =>
  state.i18n.isLoaded;

export const selectError = (state: { i18n: I18nState }): string | null =>
  state.i18n.error;

/**
 * Get translation for a specific key and language
 * Uses dynamic fallback: requested language -> default language -> key itself
 */
export const selectTranslation = (
  state: { i18n: I18nState },
  key: string,
  lang?: LanguageCode
): string => {
  const language = lang || state.i18n.language;
  const defaultLang = state.i18n.defaultLanguage;
  const translations = state.i18n.translations;

  // Try requested language first
  if (translations[language]?.[key]) {
    return translations[language][key];
  }

  // Fallback to default language
  if (translations[defaultLang]?.[key]) {
    return translations[defaultLang][key];
  }

  // Return key itself as last resort
  return key;
};
