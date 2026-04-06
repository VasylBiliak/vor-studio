import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PRODUCTS } from '@/data/products';

interface Category {
  id: string;
  name: string;
  label: string;
}

interface CategoriesState {
  categories: Category[];
  selectedCategory: string;
  isLoading: boolean;
}

const initialState: CategoriesState = {
  categories: [],
  selectedCategory: 'all',
  isLoading: false,
};

// Helper function to generate categories from products
const generateCategories = (): Category[] => {
  const uniqueCategories = Array.from(new Set(PRODUCTS.map(p => p.category)));
  
  const categoryLabels: Record<string, string> = {
    'all': 'Всі',
    'sale': 'Розпродаж',
    'new': 'Новинки',
    'essentials': 'Essentials',
    'hoodies': 'Худі',
    'tees': 'Футболки'
  };

  const categories: Category[] = [
    { id: 'all', name: 'all', label: categoryLabels['all'] },
    { id: 'sale', name: 'sale', label: categoryLabels['sale'] },
    { id: 'new', name: 'new', label: categoryLabels['new'] },
    ...uniqueCategories.map(cat => ({
      id: cat,
      name: cat,
      label: categoryLabels[cat] || cat
    }))
  ];

  return categories;
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state) => {
      state.categories = generateCategories();
      state.isLoading = false;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    initializeCategories: (state) => {
      if (state.categories.length === 0) {
        state.categories = generateCategories();
      }
    },
  },
});

export const {
  setCategories,
  setSelectedCategory,
  setLoading,
  initializeCategories,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;

// Selectors
export const selectCategories = (state: { categories: CategoriesState }) => state.categories.categories;
export const selectSelectedCategory = (state: { categories: CategoriesState }) => state.categories.selectedCategory;
export const selectCategoriesLoading = (state: { categories: CategoriesState }) => state.categories.isLoading;
