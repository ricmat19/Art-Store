import IndexAPI from "../apis/indexAPI";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const getSignedIn = createAsyncThunk("/signedIn", async () => {
  const signedInResponse = await IndexAPI.get(`/signedIn`);
  return signedInResponse.data;
});

interface signedInState {
  signedInValues: {};
}

const initialState: signedInState = {
  signedInValues: {},
};

const signedInReducers = createSlice({
  name: "signedIn",
  initialState: initialState,
  reducers: {
    setSignedIn: (state, action: PayloadAction<Object>) => {
      state.signedInValues = action.payload;
    },
    login: (state) => {
      state.signedInValues = {
        signedIn: true,
        user: "ric19mat@gmail.com",
      };
    },
    logout: (state) => {
      state.signedInValues = {
        signedIn: false,
        user: "ric19mat@gmail.com",
      };
    },
    extraReducers(builder: any) {
      builder.addCase(
        getSignedIn.fulfilled,
        (
          state: { status: string; data: any[] },
          action: PayloadAction<any[], string, { currentPage: number }>
        ) => {
          state.status = "succeeded";
          const signedInStatus = action.payload;
          return signedInStatus;
        }
      );
    },
  },
});

export const getSignedInState = (state: any) =>
  state.signedIn.signedInValues.state;
export const getSignedInUser = (state: any) =>
  state.signedIn.signedInValues.user;
export const selectSignedIn = (state: RootState) =>
  state.signedIn.signedInValues;

export const { setSignedIn, login, logout } = signedInReducers.actions;

export default signedInReducers.reducer;
