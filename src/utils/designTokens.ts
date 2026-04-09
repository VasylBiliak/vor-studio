/**
 * Design Tokens System
 * Fetches and applies design tokens from Google Sheets
 * Provides CSS variables for dynamic theming with fallback support
 */

import Papa from 'papaparse';

// Google Sheets URL for design tokens
const DESIGN_TOKENS_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTod5vKdR--_HQ60J4hbJm8d1m2cMsWwzmMsqwQvfwalkVknhuVsXGpfUOGKZ-4ZbWysPgFaOxQ19pl/pub?gid=1274078453&single=true&output=csv';

// Storage key for caching
const STORAGE_KEY = 'design_tokens_cache';
const STORAGE_TIMESTAMP_KEY = 'design_tokens_timestamp';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Default design tokens - fallback when API fails
 * These match the current globals.css values
 */
export const DEFAULT_TOKENS: Record<string, string> = {
  // Colors - Background
  color_bg_primary: '#0D0D0D',
  color_bg_secondary: '#1F1F1F',

  // Colors - Text
  color_text_primary: '#FFFFFF',
  color_text_secondary: '#9CA3AF',

  // Colors - Borders
  color_border: '#2A2A2A',

  // Colors - Accents
  color_accent_primary: '#ee144b',
  color_accent_primary_hover: '#E6003E',
  color_accent_secondary: '#2C7A4B',
  color_accent_tertiary: '#DAC165',

  // Colors - Dark theme (legacy)
  color_dark_bg: '#0D0D0D',
  color_dark_text: '#FFFFFF',
  color_dark_border: '#2A2A2A',

  // Typography
  font_base: 'Inter, system-ui, sans-serif',
  font_alt: 'Inter, system-ui, sans-serif',
  font_decorative: 'Oswald, sans-serif',

  // Layout
  max_width: '1400px',
  section_padding: '5rem',

  // Border radius
  border_radius_sm: '4px',
  border_radius_md: '8px',
  border_radius_lg: '12px',

  // Transitions
  transition_fast: '0.2s ease',
  transition_normal: '0.3s ease',
  transition_slow: '0.5s ease',
};

/**
 * Parse CSV data into design tokens object
 */
const parseTokens = (csvData: string): Record<string, string> => {
  const parsed = Papa.parse(csvData, {
    header: true,
    skipEmptyLines: true,
  });

  const tokens: Record<string, string> = {};

  // Expected CSV structure: key,value
  parsed.data.forEach((row: unknown) => {
    const rowData = row as { key?: string; value?: string };
    if (rowData.key && rowData.value !== undefined) {
      // Normalize key to snake_case
      const normalizedKey = rowData.key
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[^a-z0-9_]/g, '');
      tokens[normalizedKey] = rowData.value.trim();
    }
  });

  return tokens;
};

/**
 * Validate token values (basic validation)
 */
const validateTokens = (tokens: Record<string, string>): Record<string, string> => {
  const validated: Record<string, string> = {};

  for (const [key, value] of Object.entries(tokens)) {
    // Skip empty values
    if (!value || value.trim() === '') continue;

    // Basic color validation for color keys
    if (key.includes('color_')) {
      // Check if it's a valid hex, rgb, or named color
      const isValidColor = /^#([0-9A-Fa-f]{3,8})$/.test(value) ||
                          /^rgb\(/.test(value) ||
                          /^rgba\(/.test(value) ||
                          /^hsl\(/.test(value) ||
                          ['transparent', 'inherit', 'currentColor'].includes(value.toLowerCase());

      if (isValidColor) {
        validated[key] = value;
      } else {
        console.warn(`Invalid color value for ${key}: ${value}`);
      }
    } else {
      validated[key] = value;
    }
  }

  return validated;
};

/**
 * Merge tokens with defaults (fallback for missing values)
 */
const mergeWithDefaults = (tokens: Record<string, string>): Record<string, string> => {
  return { ...DEFAULT_TOKENS, ...tokens };
};

/**
 * Apply tokens as CSS variables to document root
 */
export const applyTokens = (tokens: Record<string, string>): void => {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;

  Object.entries(tokens).forEach(([key, value]) => {
    // Convert snake_case to kebab-case for CSS variable names
    const cssVarName = `--${key.replace(/_/g, '-')}`;
    root.style.setProperty(cssVarName, value);
  });

  // Also set font variables for backward compatibility
  if (tokens.font_base) {
    root.style.setProperty('--font-base', tokens.font_base);
  }
  if (tokens.font_alt) {
    root.style.setProperty('--font-alt', tokens.font_alt);
  }
  if (tokens.font_decorative) {
    root.style.setProperty('--font-decorative', tokens.font_decorative);
  }
};

/**
 * Save tokens to localStorage cache
 */
const saveToCache = (tokens: Record<string, string>): void => {
  if (typeof localStorage === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
    localStorage.setItem(STORAGE_TIMESTAMP_KEY, Date.now().toString());
  } catch (error) {
    console.warn('Failed to cache design tokens:', error);
  }
};

/**
 * Load tokens from localStorage cache
 */
const loadFromCache = (): Record<string, string> | null => {
  if (typeof localStorage === 'undefined') return null;

  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    const timestamp = localStorage.getItem(STORAGE_TIMESTAMP_KEY);

    if (!cached || !timestamp) return null;

    // Check if cache is still valid
    const age = Date.now() - parseInt(timestamp, 10);
    if (age > CACHE_DURATION) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_TIMESTAMP_KEY);
      return null;
    }

    return JSON.parse(cached);
  } catch (error) {
    console.warn('Failed to load cached design tokens:', error);
    return null;
  }
};

/**
 * Fetch design tokens from Google Sheets
 */
export const fetchTokens = async (): Promise<Record<string, string>> => {
  try {
    // Try to load from cache first for instant hydration
    const cached = loadFromCache();
    if (cached) {
      // Apply cached immediately, then refresh in background
      applyTokens(mergeWithDefaults(cached));
    }

    // Fetch from Google Sheets
    const response = await fetch(DESIGN_TOKENS_SHEET_URL, {
      cache: 'no-store', // Ensure fresh data
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const csvData = await response.text();
    const tokens = parseTokens(csvData);
    const validatedTokens = validateTokens(tokens);
    const mergedTokens = mergeWithDefaults(validatedTokens);

    // Cache the fresh tokens
    saveToCache(mergedTokens);

    return mergedTokens;
  } catch (error) {
    console.error('Failed to fetch design tokens:', error);

    // Try to return cached tokens even if expired
    const cached = loadFromCache();
    if (cached) {
      return mergeWithDefaults(cached);
    }

    // Fall back to defaults
    return DEFAULT_TOKENS;
  }
};

/**
 * Initialize design tokens on app start
 * Should be called in providers.tsx or layout.tsx
 */
export const initializeTokens = async (): Promise<void> => {
  const tokens = await fetchTokens();
  applyTokens(tokens);
};

/**
 * Reload tokens (useful for admin/debug)
 */
export const reloadTokens = async (): Promise<void> => {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_TIMESTAMP_KEY);
  }
  await initializeTokens();
};

/**
 * Get current token value
 */
export const getToken = (key: string): string => {
  if (typeof document === 'undefined') return DEFAULT_TOKENS[key] || '';

  const cssVarName = `--${key.replace(/_/g, '-')}`;
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(cssVarName)
    .trim();

  return value || DEFAULT_TOKENS[key] || '';
};
