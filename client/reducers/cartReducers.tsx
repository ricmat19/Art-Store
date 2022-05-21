import IndexAPI from "../apis/indexAPI";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface CartState {}

const initialState: CartState = {};

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

export const addToCartReducer = createAsyncThunk(
  "cart/addToCartReducer",
  async (id: number) => {
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

const cartReducers = createSlice({
  name: "cart",
  initialState,
  reducers: {
    extraReducers(builder: any) {
      builder
        .addCase(
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
