import IndexAPI from "../../apis/indexAPI";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
};

export const getCart = createAsyncThunk("/cart", async (name, thunkAPI) => {
  try {
    console.log(name);
    console.log(thunkAPI);
    const cartResponse = await IndexAPI.get(`/cart`);
    return cartResponse.data;
  } catch (err) {
    console.log(err);
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    clearCartState: () => {
      return {
        cartItems: [],
        amount: 0,
        total: 0,
      };
    },
    addToCartState: (state, action) => {
      console.log(action.payload);
      state.cartItems.push();
      return {
        cartItems: state.cartItems,
        amount: state.cartItems.length,
        total: 0,
      };
    },
    removeFromCartState: (state, action) => {
      const newCartItems: any = [];
      for (let i = 0; i < state.cartItems.length; i++) {
        if (state.cartItems[i] !== action.payload) {
          newCartItems.push(state.cartItems[i]);
        }
      }
      return {
        cartItems: newCartItems,
        amount: newCartItems.length,
        total: 0,
      };
    },
    // extraReducers: {
    //   [getCart.fulfilled]: (state: any, action: any) => {
    //     state.cartItems = action.payload;
    //   },
    // },
  },
});

export const { clearCartState, addToCartState, removeFromCartState } =
  cartSlice.actions;

export default cartSlice.reducer;
