/**
 * Product normalization utilities
 * Converts raw CSV data into localized Product structure
 */

import { Product, RawProductRow, DiscountInfo } from '@/types/product';

const DEFAULT_IMG = 'https://placehold.co/600x600?text=Product';
const DEFAULT_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const DEFAULT_DESC = 'Product description not available.';

/**
 * Parse comma-separated values into array
 */
export function parseList(value: string | undefined): string[] {
  if (!value || value.trim() === '') return [];
  return value.split(',').map((s) => s.trim()).filter(Boolean);
}

/**
 * Parse images field
 */
export function parseImages(value: string | undefined): string[] {
  const images = parseList(value);
  return images.length > 0 ? images : [DEFAULT_IMG];
}

/**
 * Parse sizes field
 */
export function parseSizes(value: string | undefined): string[] {
  const sizes = parseList(value);
  return sizes.length > 0 ? sizes : DEFAULT_SIZES;
}

/**
 * Parse number from string value
 */
export function parseNumber(value: string | undefined, defaultValue = 0): number {
  if (!value || value.trim() === '') return defaultValue;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? defaultValue : parsed;
}

/**
 * Calculate final price with discount
 */
export function calculateFinalPrice(price: number, discount: number): number {
  if (!discount || discount <= 0 || price <= 0) return price;
  const discountAmount = (price * discount) / 100;
  return Math.round((price - discountAmount) * 100) / 100;
}

/**
 * Calculate discount info
 */
export function calculateDiscountInfo(price: number, discount: number): DiscountInfo {
  const hasDiscount = discount > 0 && price > 0;
  const finalPrice = hasDiscount ? calculateFinalPrice(price, discount) : price;
  return {
    originalPrice: price,
    finalPrice,
    discountPercent: discount,
    discountAmount: hasDiscount ? price - finalPrice : 0,
    hasDiscount,
  };
}

/**
 * Get localized field value with fallback
 */
export function getLocalizedValue(
  row: RawProductRow,
  fieldName: string,
  lang: string,
  defaultLang: string
): string {
  // Try current language first
  const langValue = row[`${fieldName}_${lang}`]?.trim();
  if (langValue) return langValue;

  // Fallback to default language
  const defaultValue = row[`${fieldName}_${defaultLang}`]?.trim();
  if (defaultValue) return defaultValue;

  // Fallback to base field (for default language)
  const baseValue = row[fieldName]?.trim();
  if (baseValue) return baseValue;

  // Last resort: try any language variant
  for (const key of Object.keys(row)) {
    if (key.startsWith(`${fieldName}_`)) {
      const value = row[key]?.trim();
      if (value) return value;
    }
  }

  return '';
}

/**
 * Get localized price with fallback
 */
export function getLocalizedPrice(
  row: RawProductRow,
  lang: string,
  defaultLang: string
): number {
  // Try current language price
  const langPrice = parseNumber(row[`price_${lang}`], 0);
  if (langPrice > 0) return langPrice;

  // Fallback to default language
  const defaultPrice = parseNumber(row[`price_${defaultLang}`], 0);
  if (defaultPrice > 0) return defaultPrice;

  // Fallback to base price field
  const basePrice = parseNumber(row.price, 0);
  if (basePrice > 0) return basePrice;

  // Try any price field
  for (const key of Object.keys(row)) {
    if (key.startsWith('price_')) {
      const price = parseNumber(row[key], 0);
      if (price > 0) return price;
    }
  }

  return 0;
}

/**
 * Normalize a single raw product into localized Product
 */
export function normalizeProduct(
  row: RawProductRow,
  lang: string,
  defaultLang: string
): Product {
  const id = parseInt(row.id || '0', 10);
  const category = row.category || 'uncategorized';

  // Localized text fields
  const name = getLocalizedValue(row, 'name', lang, defaultLang) || 'Unnamed Product';
  const description = getLocalizedValue(row, 'desc', lang, defaultLang) || DEFAULT_DESC;
  const badge = getLocalizedValue(row, 'badge', lang, defaultLang) || null;

  // Parse other fields
  const badgeType = row.badgeType?.trim() || null;
  const sizes = parseSizes(row.sizes);
  const images = parseImages(row.img);

  // Price and discount
  const price = getLocalizedPrice(row, lang, defaultLang);
  const discount = parseNumber(row.discount, 0);
  const finalPrice = calculateFinalPrice(price, discount);
  const hasDiscount = discount > 0 && price > 0 && finalPrice < price;

  return {
    id,
    category,
    name,
    description,
    badge,
    badgeType,
    sizes,
    images,
    price,
    discount,
    finalPrice: hasDiscount ? finalPrice : price,
    hasDiscount,
  };
}

/**
 * Normalize multiple products
 */
export function normalizeProducts(
  rows: RawProductRow[],
  lang: string,
  defaultLang: string
): Product[] {
  return rows
    .filter((row) => row.id && row.id.trim() !== '')
    .map((row) => normalizeProduct(row, lang, defaultLang));
}

/**
 * Format price with currency symbol
 */
export function formatPrice(
  price: number,
  options: {
    currency?: string;
    locale?: string;
    showCurrency?: boolean;
  } = {}
): string {
  const { currency = 'UAH', locale = 'uk-UA', showCurrency = true } = options;

  const formatted = price.toLocaleString(locale);

  if (!showCurrency) return formatted;

  const symbol = CURRENCY_SYMBOLS[currency] || currency;
  return `${formatted} ${symbol}`;
}

/**
 * Format price using Intl.NumberFormat
 */
export function formatPriceIntl(
  price: number,
  options: {
    currency?: string;
    locale?: string;
  } = {}
): string {
  const { currency = 'UAH', locale = 'uk-UA' } = options;

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  } catch {
    return formatPrice(price, { currency, locale });
  }
}

/**
 * Get discount badge text (e.g., "-20%")
 */
export function getDiscountBadgeText(discount: number): string {
  if (!discount || discount <= 0) return '';
  return `-${Math.round(discount)}%`;
}

// Currency symbols
const CURRENCY_SYMBOLS: Record<string, string> = {
  UAH: '₴',
  USD: '$',
  EUR: '€',
  GBP: '£',
};
