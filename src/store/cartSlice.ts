import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartState } from '../types/cart';

const initialState: CartState = {
  items: {},
  isLoading: false,
  error: null
};

// Load cart from localStorage
const loadCartFromStorage = (): Record<string, CartItem> => {
  try {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : {};
  } catch {
    return {};
  }
};

// Save cart to localStorage
const saveCartToStorage = (items: Record<string, CartItem>) => {
  try {
    localStorage.setItem('cart', JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    ...initialState,
    items: loadCartFromStorage()
  },
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      if (state.items[item.id]) {
        state.items[item.id].quantity += 1;
      } else {
        state.items[item.id] = { ...item, quantity: 1 };
      }
      saveCartToStorage(state.items);
    },
    
    removeItem: (state, action: PayloadAction<string>) => {
      delete state.items[action.payload];
      saveCartToStorage(state.items);
    },
    
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload;
      if (state.items[id]) {
        if (quantity <= 0) {
          delete state.items[id];
        } else {
          state.items[id].quantity = quantity;
        }
        saveCartToStorage(state.items);
      }
    },
    
    clearCart: (state) => {
      state.items = {};
      saveCartToStorage(state.items);
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const { 
  addItem, 
  removeItem, 
  updateQuantity, 
  clearCart, 
  setLoading, 
  setError 
} = cartSlice.actions;

export default cartSlice.reducer;