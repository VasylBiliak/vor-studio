import Papa from 'papaparse';

export interface Product {
  id: number;
  category: string;
  name: string;
  price: number;
  badge?: string | null;
  badgeType?: string | null;
  sizes: string[];
  img: string[];
  desc: string;
}

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTod5vKdR--_HQ60J4hbJm8d1m2cMsWwzmMsqwQvfwalkVknhuVsXGpfUOGKZ-4ZbWysPgFaOxQ19pl/pub?gid=0&single=true&output=csv';

let productsCache: Product[] = [];

export const getAllProducts = async (): Promise<Product[]> => {
  if (productsCache.length > 0) return productsCache;

  try {
    const response = await fetch(SHEET_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.text();
    const parsed = Papa.parse(data, { header: true, skipEmptyLines: true }).data as any[];

    productsCache = parsed.map(row => ({
      id: Number(row.id),
      category: row.category,
      name: row.name,
      price: Number(row.price),
      badge: row.badge || null,
      badgeType: row.badgeType || null,
      sizes: row.sizes ? row.sizes.split(',').map((s: string) => s.trim()) : [],
      img: row.img ? row.img.split(',').map((i: string) => i.trim()) : [],
      desc: row.desc || '',
    }));

    return productsCache;
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
};

export const getProductById = (id: number): Product | undefined => {
  return productsCache.find(product => product.id === id);
};

export const getRelatedProducts = (id: number, limit: number = 4): Product[] => {
  const currentProduct = getProductById(id);
  if (!currentProduct) return [];

  return productsCache
    .filter(p => p.category === currentProduct.category && p.id !== id)
    .slice(0, limit);
};