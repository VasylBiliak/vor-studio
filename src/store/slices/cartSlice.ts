import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  uid: string;
}

interface LastAddedItem {
  product: Product;
  quantity: number;
  size?: string;
  timestamp: number;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
  isOpen: boolean;
  lastAddedItem: LastAddedItem | null;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  totalItems: 0,
  isOpen: false,
  lastAddedItem: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; size?: string }>) => {
      const { product, size } = action.payload;
      const existingItem = state.items.find(
        item => item.product.id === product.id && item.size === size
      );

      if (existingItem) {
        existingItem.quantity += 1;
        state.totalItems += 1;
        state.totalAmount += product.price;
        state.lastAddedItem = {
          product,
          quantity: existingItem.quantity,
          size,
          timestamp: Date.now(),
        };
      } else {
        const uid = `${product.id}-${size || 'default'}-${Date.now()}`;
        const cartItem: CartItem = {
          product,
          quantity: 1,
          size,
          uid,
        };
        state.items.push(cartItem);
        state.totalItems += 1;
        state.totalAmount += product.price;
        state.lastAddedItem = {
          product,
          quantity: 1,
          size,
          timestamp: Date.now(),
        };
      }
    },
    removeFromCart: (state, action: PayloadAction<{ id: number; size?: string }>) => {
      const { id, size } = action.payload;
      const itemIndex = state.items.findIndex(
        item => item.product.id === id && item.size === size
      );

      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        state.totalItems -= item.quantity;
        state.totalAmount -= item.product.price * item.quantity;
        state.items.splice(itemIndex, 1);
      }
    },
    increaseQuantity: (state, action: PayloadAction<{ id: number; size?: string }>) => {
      const { id, size } = action.payload;
      const item = state.items.find(
        item => item.product.id === id && item.size === size
      );

      if (item) {
        item.quantity += 1;
        state.totalItems += 1;
        state.totalAmount += item.product.price;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<{ id: number; size?: string }>) => {
      const { id, size } = action.payload;
      const itemIndex = state.items.findIndex(
        item => item.product.id === id && item.size === size
      );

      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        if (item.quantity > 1) {
          item.quantity -= 1;
          state.totalItems -= 1;
          state.totalAmount -= item.product.price;
        } else {
          state.totalItems -= 1;
          state.totalAmount -= item.product.price;
          state.items.splice(itemIndex, 1);
        }
      }
    },
    updateSize: (state, action: PayloadAction<{ id: number; oldSize?: string; newSize?: string }>) => {
      const { id, oldSize, newSize } = action.payload;
      const itemIndex = state.items.findIndex(
        item => item.product.id === id && item.size === oldSize
      );

      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        const existingItemWithNewSize = state.items.find(
          item => item.product.id === id && item.size === newSize
        );

        if (existingItemWithNewSize && existingItemWithNewSize.uid !== item.uid) {
          existingItemWithNewSize.quantity += item.quantity;
          state.items.splice(itemIndex, 1);
        } else {
          item.size = newSize;
          item.uid = `${id}-${newSize || 'default'}-${Date.now()}`;
        }
      }
    },
    updateQuantity: (state, action: PayloadAction<{ uid: string; quantity: number }>) => {
      const { uid, quantity } = action.payload;
      const item = state.items.find(item => item.uid === uid);

      if (item && quantity > 0) {
        const quantityDiff = quantity - item.quantity;
        state.totalAmount += item.product.price * quantityDiff;
        state.totalItems += quantityDiff;
        item.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalItems = 0;
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    loadCartFromStorage: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      state.totalAmount = state.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    clearLastAddedItem: (state) => {
      state.lastAddedItem = null;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  updateSize,
  updateQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
  loadCartFromStorage,
  clearLastAddedItem,
} = cartSlice.actions;

export default cartSlice.reducer;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotalAmount = (state: { cart: CartState }) => state.cart.totalAmount;
export const selectCartTotalItems = (state: { cart: CartState }) => state.cart.totalItems;
export const selectCartIsOpen = (state: { cart: CartState }) => state.cart.isOpen;
export const selectLastAddedItem = (state: { cart: CartState }) => state.cart.lastAddedItem;
