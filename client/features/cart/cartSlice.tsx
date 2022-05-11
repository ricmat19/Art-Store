import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    increaseCart: (state) => {},
    decreaseCart: (state) => {},
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
