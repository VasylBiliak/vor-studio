import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './slices/categoriesSlice';
import cartReducer from './slices/cartSlice';
import i18nReducer from './slices/i18nSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    cart: cartReducer,
    i18n: i18nReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['cart/addToCart', 'cart/removeFromCart'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
