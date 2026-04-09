/**
 * Product types with localization support
 */

/** Product with localized fields already resolved */
export interface Product {
  id: number;
  category: string;
  name: string;
  description: string;
  badge: string | null;
  badgeType: string | null;
  sizes: string[];
  images: string[];
  price: number;
  discount: number;
  finalPrice: number;
  hasDiscount: boolean;
}

/** Raw product row from CSV with all language variants */
export interface RawProductRow {
  id: string;
  category: string;
  badgeType?: string;
  sizes?: string;
  img?: string;
  discount?: string;
  [key: string]: string | undefined;
}

/** Price formatting options */
export interface PriceFormatOptions {
  currency?: string;
  locale?: string;
  showCurrency?: boolean;
}

/** Discount info */
export interface DiscountInfo {
  originalPrice: number;
  finalPrice: number;
  discountPercent: number;
  discountAmount: number;
  hasDiscount: boolean;
}

/** Currency symbols by code */
export const CURRENCY_SYMBOLS: Record<string, string> = {
  UAH: '₴',
  USD: '$',
  EUR: '€',
  GBP: '£',
};

/** Default currency */
export const DEFAULT_CURRENCY = 'UAH';

/** Default locale */
export const DEFAULT_LOCALE = 'uk-UA';
