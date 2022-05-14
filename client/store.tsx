import { configureStore } from "@reduxjs/toolkit";
import cartReducers from "./reducers/cartReducers";
import loginReducer from "./reducers/signedInReducers";

export const store = configureStore({
  reducer: {
    cart: cartReducers,
    signedIn: loginReducer,
  },
});
