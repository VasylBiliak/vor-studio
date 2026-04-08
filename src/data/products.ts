export interface Product {
  id: number;
  category: string;
  name: string;
  price: number;
  badge?: string | null;
  badgeType?: string | null;
  sizes: string[];
  img: string[]
  desc: string;
}

export const DEFAULT_IMG = 'https://placehold.co/600x600?text=600x600';
export const DEFAULT_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
export const LOREM = '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    category: 'essentials',
    name: 'CONCEPT BOX "ULTRA"',
    price: 7200,
    badge: 'Best',
    badgeType: 'new',
    sizes: DEFAULT_SIZES,
    img: [DEFAULT_IMG, DEFAULT_IMG],
    desc: LOREM
  },
  {
    id: 2,
    category: 'essentials',
    name: 'CONCEPT BOX "CORE"',
    price: 4800,
    badge: null,
    sizes: DEFAULT_SIZES,
     img: [DEFAULT_IMG, DEFAULT_IMG],
    desc: LOREM
  },
  {
    id: 3,
    category: 'hoodies',
    name: 'HOODIE "ESSENTIAL" ONYX',
    price: 3800,
    badge: null,
    sizes: DEFAULT_SIZES,
     img: [DEFAULT_IMG, DEFAULT_IMG],
    desc: LOREM
  },
  {
    id: 4,
    category: 'tees',
    name: 'LONGSLEEVE "URBAN ECHO"',
    price: 2900,
    badge: 'New Era',
    badgeType: 'new',
    sizes: DEFAULT_SIZES,
     img: [DEFAULT_IMG, DEFAULT_IMG],
    desc: LOREM
  },
  {
    id: 5,
    category: 'tees',
    name: 'LONGSLEEVE "VELOCITY"',
    price: 3300,
    badge: null,
    sizes: DEFAULT_SIZES,
     img: [DEFAULT_IMG, DEFAULT_IMG],
    desc: LOREM
  },
  {
    id: 6,
    category: 'tees',
    name: 'LONGSLEEVE "MATRIX" ASH',
    price: 3300,
    badge: null,
    sizes: DEFAULT_SIZES,
     img: [DEFAULT_IMG, DEFAULT_IMG],
    desc: LOREM
  },
  {
    id: 7,
    category: 'hoodies',
    name: 'HOODIE "PULSE" BURGUNDY',
    price: 3800,
    badge: null,
    sizes: DEFAULT_SIZES,
     img: [DEFAULT_IMG, DEFAULT_IMG],
    desc: LOREM
  },
  {
    id: 8,
    category: 'tees',
    name: 'LONGSLEEVE "COAST" NAVY',
    price: 3300,
    badge: 'New',
    badgeType: 'new',
    sizes: DEFAULT_SIZES,
     img: [DEFAULT_IMG, DEFAULT_IMG],
    desc: LOREM
  },
  {
    id: 9,
    category: 'hoodies',
    name: 'HOODIE "SIGNATURE" BLACK',
    price: 3800,
    badge: null,
    sizes: DEFAULT_SIZES,
     img: [DEFAULT_IMG, DEFAULT_IMG],
    desc: LOREM
  },
  {
    id: 10,
    category: 'hoodies',
    name: 'HOODIE "VINTAGE" WASHED',
    price: 3600,
    badge: 'Sale',
    badgeType: 'sale',
    sizes: DEFAULT_SIZES,
     img: [DEFAULT_IMG, DEFAULT_IMG],
    desc: LOREM
  },
  {
    id: 11,
    category: 'tees',
    name: 'T-SHIRT "BASIC" BLACK',
    price: 1600,
    badge: null,
    sizes: DEFAULT_SIZES,
     img: [DEFAULT_IMG, DEFAULT_IMG],
    desc: LOREM
  },
  {
    id: 12,
    category: 'tees',
    name: 'T-SHIRT "BASIC" WHITE',
    price: 1600,
    badge: null,
    sizes: DEFAULT_SIZES,
     img: [DEFAULT_IMG, DEFAULT_IMG],
    desc: LOREM
  }
];

export function getProductById(id: number): Product | undefined {
  return PRODUCTS.find(product => product.id === id);
}

export function getRelatedProducts(currentProductId: number, limit: number = 4): Product[] {
  return PRODUCTS
    .filter(product => product.id !== currentProductId)
    .sort(() => Math.random() - 0.5)
    .slice(0, limit);
}