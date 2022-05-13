import IndexAPI from "../apis/indexAPI";
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

const cartReducers = createSlice({
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
    extraReducers(builder: any) {
      builder
        .addCase(getCart.pending, (state: any) => {
          state.status = "loading";
        })
        .addCase(getCart.fulfilled, (state: any, action: any) => {
          state.status = "succeeded";
          const signedInStatus = action.payload;
          console.log(signedInStatus);
          state.signedIn = signedInStatus;
        })
        .addCase(getCart.rejected, (state: any, action: any) => {
          state.status = "failed";
          state.error = action.error.message;
        });
    },
  },
});

export const { clearCartState, addToCartState, removeFromCartState } =
  cartReducers.actions;

export default cartReducers.reducer;
