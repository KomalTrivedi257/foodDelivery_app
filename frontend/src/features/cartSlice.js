import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    total: 0
  },
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.items.findIndex(item => item._id === action.payload._id);
      if (itemIndex >= 0) {
        // Increase quantity
        state.items[itemIndex].quantity += 1;
      } else {
        // Add new item
        state.items.push({ 
          ...action.payload, 
          quantity: 1 
        });
      }
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    removeFromCart: (state, action) => {
      const newItems = state.items.filter(item => item._id !== action.payload);
      state.items = newItems;
      state.total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    }
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
