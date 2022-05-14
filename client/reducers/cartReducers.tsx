import IndexAPI from "../apis/indexAPI";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface CartState {
  cartItems: [];
  cartQty: number;
  cartTotal: number;
}

const initialState: CartState = {
  cartItems: [],
  cartQty: 0,
  cartTotal: 0,
};

export const getCart = createAsyncThunk("cart", async () => {
  try {
    const cartResponse = await IndexAPI.get(`/cart`);
    return cartResponse.data.data;
  } catch (err) {
    console.log(err);
  }
});

const cartReducers = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      state.cartQty = 0;
      state.cartTotal = 0;
    },
    addToCart: (state: CartState, action: PayloadAction<[]>) => {
      for (let i = 0; i < action.payload.length; i++) {
        state.cartItems.push(action.payload[i]);
      }
      state.cartQty = state.cartItems.length;
      // state.cartTotal = 0;
    },
    // removeFromCartState: (state: CartState, action: PayloadAction<[]>) => {
    //   const newCartItems: any = [];
    //   for (let i = 0; i < state.cartItems.length; i++) {
    //     if (state.cartItems[i] !== action.payload) {
    //       newCartItems.push(state.cartItems[i]);
    //     }
    //   }
    //   state.cartValues = {
    //     cartItems: newCartItems,
    //     amount: newCartItems.length,
    //     total: 0,
    //   };
    // },
    extraReducers(builder: any) {
      builder.addCase(getCart.fulfilled, (state: any, action: any) => {
        state.status = "fulfilled";
        state.data = action.payload;
        // return cartStatus;
      });
    },
  },
});

export const { clearCart, addToCart } = cartReducers.actions;
export default cartReducers.reducer;
export const selectCart = (state: RootState) => state.cart;
