/**
 * Currency formatting utility
 * Uses Intl.NumberFormat for locale-aware currency display
 */

/**
 * Map currency symbols to ISO codes
 * This handles cases where symbols like "€" are passed instead of "EUR"
 */
const CURRENCY_MAP: Record<string, string> = {
  '€': 'EUR',
  '$': 'USD',
  '₴': 'UAH',
  '£': 'GBP',
  '¥': 'JPY', // Also used for CNY, but JPY is more common for ¥ symbol
  '₽': 'RUB',
  '₹': 'INR',
  '₩': 'KRW',
  '元': 'CNY', // Chinese character for Yuan
  '฿': 'THB',
  '₫': 'VND',
  '₪': 'ILS',
  '₺': 'TRY',
  '₦': 'NGN',
  '₱': 'PHP',
  '₲': 'PYG',
  '₡': 'CRC',
  '₭': 'LAK',
  '₮': 'MNT',
  '₳': 'ARA',
  '₵': 'GHS',
  '¢': 'USD',
  '﷼': 'IRR',
  'ᴃ': 'BTC',
};

/**
 * Normalize currency code to valid ISO 4217 format
 * Handles both symbols (€ → EUR) and lowercase codes (eur → EUR)
 *
 * @param currency - The currency code or symbol
 * @returns Normalized ISO 4217 currency code
 */
function normalizeCurrency(currency: string): string {
  if (!currency) return 'USD';

  const trimmed = currency.trim();

  // Check if it's a symbol in our map
  const mapped = CURRENCY_MAP[trimmed];
  if (mapped) return mapped;

  // Otherwise, uppercase the code
  return trimmed.toUpperCase();
}

/**
 * Validate if a string is a valid ISO 4217 currency code (3 uppercase letters)
 *
 * @param code - The currency code to validate
 * @returns True if valid ISO 4217 code
 */
function isValidCurrencyCode(code: string): boolean {
  return /^[A-Z]{3}$/.test(code);
}

/**
 * Format a number as currency using Intl.NumberFormat
 *
 * @param value - The numeric value to format
 * @param currency - The currency code (e.g., 'USD', 'UAH', 'EUR') or symbol (e.g., '€', '$', '₴')
 * @param locale - The locale string (e.g., 'en-US', 'uk-UA')
 * @returns Formatted currency string
 *
 * @example
 * formatCurrency(1000, 'USD', 'en-US') // "$1,000.00"
 * formatCurrency(1000, 'UAH', 'uk-UA') // "1 000,00 ₴"
 * formatCurrency(1000, '€', 'de-DE')   // "1.000,00 €" (symbol mapped to EUR)
 */
export function formatCurrency(
  value: number,
  currency: string,
  locale: string = 'en-US'
): string {
  // Ensure valid inputs
  const safeValue = typeof value === 'number' && !isNaN(value) ? value : 0;
  const safeLocale = locale || 'en-US';

  // Normalize currency: symbol → ISO code, lowercase → uppercase
  let safeCurrency = normalizeCurrency(currency);

  // Validate and fallback to USD if invalid
  if (!isValidCurrencyCode(safeCurrency)) {
    console.warn(`Invalid currency code: "${currency}", falling back to USD`);
    safeCurrency = 'USD';
  }

  try {
    return new Intl.NumberFormat(safeLocale, {
      style: 'currency',
      currency: safeCurrency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(safeValue);
  } catch (error) {
    // Fallback if Intl.NumberFormat fails (e.g., unsupported currency)
    console.warn(`Currency formatting failed for ${safeCurrency}:`, error);
    return `${safeValue.toFixed(2)} ${safeCurrency}`;
  }
}

/**
 * Format currency with compact notation for large numbers
 *
 * @param value - The numeric value to format
 * @param currency - The currency code
 * @param locale - The locale string
 * @returns Formatted compact currency string
 *
 * @example
 * formatCompactCurrency(1500000, 'USD', 'en-US') // "$1.5M"
 */
export function formatCompactCurrency(
  value: number,
  currency: string,
  locale: string = 'en-US'
): string {
  const safeValue = typeof value === 'number' && !isNaN(value) ? value : 0;
  const safeLocale = locale || 'en-US';

  // Normalize and validate currency
  let safeCurrency = normalizeCurrency(currency);
  if (!isValidCurrencyCode(safeCurrency)) {
    safeCurrency = 'USD';
  }

  try {
    return new Intl.NumberFormat(safeLocale, {
      style: 'currency',
      currency: safeCurrency,
      notation: 'compact',
      compactDisplay: 'short',
      maximumFractionDigits: 1,
    }).format(safeValue);
  } catch (error) {
    return formatCurrency(safeValue, safeCurrency, safeLocale);
  }
}

/**
 * Get currency symbol only (without value)
 *
 * @param currency - The currency code
 * @param locale - The locale string
 * @returns Currency symbol string
 *
 * @example
 * getCurrencySymbol('USD', 'en-US') // "$"
 * getCurrencySymbol('UAH', 'uk-UA') // "₴"
 */
export function getCurrencySymbol(
  currency: string,
  locale: string = 'en-US'
): string {
  const safeLocale = locale || 'en-US';

  // Normalize and validate currency
  let safeCurrency = normalizeCurrency(currency);
  if (!isValidCurrencyCode(safeCurrency)) {
    safeCurrency = 'USD';
  }

  try {
    const formatter = new Intl.NumberFormat(safeLocale, {
      style: 'currency',
      currency: safeCurrency,
    });

    // Extract symbol from formatted string
    const parts = formatter.formatToParts(0);
    const symbolPart = parts.find((part) => part.type === 'currency');
    return symbolPart?.value || safeCurrency;
  } catch (error) {
    return safeCurrency;
  }
}

/**
 * Map language code to appropriate locale for formatting
 * This helps ensure proper currency formatting per language
 *
 * @param lang - The language code (e.g., 'en', 'ua', 'es')
 * @returns The corresponding locale string
 */
export function langToLocale(lang: string): string {
  const localeMap: Record<string, string> = {
    en: 'en-US',
    ua: 'uk-UA',
    uk: 'uk-UA',
    es: 'es-ES',
    de: 'de-DE',
    fr: 'fr-FR',
    pl: 'pl-PL',
    it: 'it-IT',
  };

  return localeMap[lang?.toLowerCase()] || lang || 'en-US';
}

/**
 * Format price for product display
 * Wrapper that combines language-based locale selection with currency formatting
 *
 * @param price - The price value
 * @param currency - The currency code
 * @param lang - The language code
 * @returns Formatted price string
 *
 * @example
 * formatPrice(1000, 'UAH', 'ua') // "1 000,00 ₴"
 */
export function formatPrice(
  price: number,
  currency: string,
  lang: string
): string {
  const locale = langToLocale(lang);
  return formatCurrency(price, currency, locale);
}
