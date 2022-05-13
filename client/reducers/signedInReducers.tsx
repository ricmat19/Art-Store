import IndexAPI from "../apis/indexAPI";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getSignedIn = createAsyncThunk(
  "/signedIn",
  async (name, thunkAPI) => {
    try {
      console.log(name);
      console.log(thunkAPI);
      const signedInResponse = await IndexAPI.get(`/signedIn`);
      return signedInResponse.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const initialState = {
  loggedIn: true,
};

const signedInReducers = createSlice({
  name: "signedIn",
  initialState: initialState,
  reducers: {
    login: () => {
      return {
        loggedIn: true,
      };
    },
    logout: () => {
      return {
        loggedIn: false,
      };
    },
    extraReducers(builder: any) {
      builder
        .addCase(getSignedIn.pending, (state: any) => {
          state.status = "loading";
        })
        .addCase(getSignedIn.fulfilled, (state: any, action: any) => {
          state.status = "succeeded";
          const signedInStatus = action.payload;
          console.log(signedInStatus);
          state.signedIn = signedInStatus;
        })
        .addCase(getSignedIn.rejected, (state: any, action: any) => {
          state.status = "failed";
          state.error = action.error.message;
        });
    },
  },
});

export const getSignedInStatus = (state: any) => state.signedIn.status;
export const getSignedInError = (state: any) => state.signedIn.error;

export const { login, logout } = signedInReducers.actions;

export default signedInReducers.reducer;
