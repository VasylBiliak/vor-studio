import Papa from 'papaparse';
import { Product, RawProductRow } from '@/types/product';
import { normalizeProducts, normalizeProduct } from '@/utils/normalizeProduct';

// Re-export Product type for backward compatibility
export type { Product } from '@/types/product';

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTod5vKdR--_HQ60J4hbJm8d1m2cMsWwzmMsqwQvfwalkVknhuVsXGpfUOGKZ-4ZbWysPgFaOxQ19pl/pub?gid=0&single=true&output=csv';

// Cache for raw data (language-neutral)
let rawProductsCache: RawProductRow[] = [];

/**
 * Fetch raw products from CSV (cached)
 */
export const fetchRawProducts = async (): Promise<RawProductRow[]> => {
  if (rawProductsCache.length > 0) return rawProductsCache;

  try {
    const response = await fetch(SHEET_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.text();
    const parsed = Papa.parse(data, {
      header: true,
      skipEmptyLines: true,
    });

    rawProductsCache = parsed.data as RawProductRow[];
    return rawProductsCache;
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
};

/**
 * Get all products localized for specific language
 */
export const getAllProducts = async (lang: string, defaultLang: string): Promise<Product[]> => {
  const rawProducts = await fetchRawProducts();
  return normalizeProducts(rawProducts, lang, defaultLang);
};

/**
 * Get single product by ID (localized)
 */
export const getProductById = async (id: number, lang: string, defaultLang: string): Promise<Product | undefined> => {
  const rawProducts = await fetchRawProducts();
  const rawProduct = rawProducts.find((row) => parseInt(row.id || '0', 10) === id);

  if (!rawProduct) return undefined;

  return normalizeProduct(rawProduct, lang, defaultLang);
};

/**
 * Get related products (same category)
 */
export const getRelatedProducts = async (id: number, lang: string, defaultLang: string, limit: number = 4): Promise<Product[]> => {
  const allProducts = await getAllProducts(lang, defaultLang);
  const currentProduct = allProducts.find((p) => p.id === id);

  if (!currentProduct) return [];

  return allProducts
    .filter((p) => p.category === currentProduct.category && p.id !== id)
    .slice(0, limit);
};

/**
 * Clear cache (useful for testing or when data changes)
 */
export const clearProductsCache = (): void => {
  rawProductsCache = [];
};