import IndexAPI from "../apis/indexAPI";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface CartState {}

const initialState: CartState = {};

// Get and return cart content
export const getCartReducer = createAsyncThunk(
  "cart/getCartReducer",
  async () => {
    try {
      const cartResponse = await IndexAPI.get(`/cart`);
      return cartResponse.data.data;
    } catch (err) {
      console.log(err);
    }
  }
);

// Add an item to the cart
export const addToCartReducer = createAsyncThunk(
  "cart/addToCartReducer",
  async (id: string) => {
    try {
      const cartPostResponse = await IndexAPI.post("/cart", {
        id,
      });
      return cartPostResponse.data.data;
    } catch (err) {
      console.log(err);
    }
  }
);

// Remove an item from the cart
export const removeFromCartReducer = createAsyncThunk(
  "cart/removeFromCartReducer",
  async (id: string) => {
    try {
      const cartRemovePostResponse = await IndexAPI.put("/cart/delete", {
        id,
      });
      return cartRemovePostResponse.data.data;
    } catch (err) {
      console.log(err);
    }
  }
);

// Set/Update the cart quantity
export const setCartQtyReducer = createAsyncThunk(
  "cart/removeFromCartReducer",
  async (cartQty: number[]) => {
    try {
      const cartQtyResponse = await IndexAPI.put("/cart/quantity", {
        cartQty,
      });
      return cartQtyResponse.data.data;
    } catch (err) {
      console.log(err);
    }
  }
);

// Clear the cart
export const clearCartReducer = createAsyncThunk(
  "cart/clearCartReducer",
  async () => {
    try {
      IndexAPI.put(`/cart/deleteAll`);
    } catch (err) {
      console.log(err);
    }
  }
);

// Cart reducers
const cartReducers = createSlice({
  name: "cart",
  initialState,
  reducers: {
    extraReducers(builder: any) {
      builder
        .addCase(
          // Extra reducer to get cart content
          getCartReducer.fulfilled,
          (
            state: { status: string; data: any[] },
            action: PayloadAction<any[], string, { currentPage: number }>
          ) => {
            state.status = "fulfilled";
            state.data = action.payload;
          }
        )
        .addCase(
          // Extra reducer to add an item to the cart
          addToCartReducer.fulfilled,
          (
            state: { status: string; data: any[] },
            action: PayloadAction<any[], string, { currentPage: number }>
          ) => {
            state.status = "fulfilled";
            state.data = action.payload;
          }
        )
        .addCase(
          // Extra reducer to remove an item from the cart
          removeFromCartReducer.fulfilled,
          (
            state: { status: string; data: any[] },
            action: PayloadAction<any[], string, { currentPage: number }>
          ) => {
            state.status = "fulfilled";
            state.data = action.payload;
          }
        )
        .addCase(
          // Extra reducer to set the cart quantity
          setCartQtyReducer.fulfilled,
          (
            state: { status: string; data: any[] },
            action: PayloadAction<any[], string, { currentPage: number }>
          ) => {
            state.status = "fulfilled";
            state.data = action.payload;
          }
        )
        .addCase(
          // Extra reducer to clear the cart
          clearCartReducer.fulfilled,
          (
            state: { status: string; data: any[] },
            action: PayloadAction<any[], string, { currentPage: number }>
          ) => {
            state.status = "fulfilled";
            state.data = action.payload;
          }
        );
    },
  },
});

export default cartReducers.reducer;
export const selectCart = (state: RootState) => state.cart;
