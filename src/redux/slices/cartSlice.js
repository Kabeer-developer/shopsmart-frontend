import { createSlice } from "@reduxjs/toolkit";

const cartItemsFromStorage = JSON.parse(localStorage.getItem("cartItems")) || [];

const initialState = {
  items: cartItemsFromStorage, // consistent naming
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.items.find((x) => x._id === item._id);

      if (existItem) {
        state.items = state.items.map((x) =>
          x._id === existItem._id ? { ...x, qty: x.qty + item.qty } : x
        );
      } else {
        state.items.push({ ...item, qty: item.qty || 1 });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    updateQuantity: (state, action) => {
      const { id, qty } = action.payload;
      state.items = state.items.map((x) =>
        x._id === id ? { ...x, qty } : x
      );
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((x) => x._id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
