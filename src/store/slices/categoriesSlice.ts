import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllCategories, Category } from '@/utils/getCategories';

export const fetchCategories = createAsyncThunk<
  Category[],
  string, 
  { rejectValue: string }
>(
  'categories/fetchCategories',
  async (lang, { rejectWithValue }) => {
    try {
      const data = await fetchAllCategories(lang);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Не вдалося завантажити категорії');
    }
  }
);

interface CategoriesState {
  categories: Category[];
  selectedCategory: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  selectedCategory: 'all',
  isLoading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    initializeCategories: (state) => {
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setSelectedCategory,
  initializeCategories,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;

// Selectors
export const selectCategories = (state: { categories: CategoriesState }) => state.categories.categories;
export const selectSelectedCategory = (state: { categories: CategoriesState }) => state.categories.selectedCategory;
export const selectCategoriesLoading = (state: { categories: CategoriesState }) => state.categories.isLoading;