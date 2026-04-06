import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/data/products';

interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  uid: string;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  totalItems: 0,
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; size?: string }>) => {
      const { product, size } = action.payload;
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
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const uid = action.payload;
      const itemIndex = state.items.findIndex(item => item.uid === uid);
      
      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        state.totalItems -= item.quantity;
        state.totalAmount -= item.product.price * item.quantity;
        state.items.splice(itemIndex, 1);
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
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
  loadCartFromStorage,
} = cartSlice.actions;

export default cartSlice.reducer;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotalAmount = (state: { cart: CartState }) => state.cart.totalAmount;
export const selectCartTotalItems = (state: { cart: CartState }) => state.cart.totalItems;
export const selectCartIsOpen = (state: { cart: CartState }) => state.cart.isOpen;
