import { configureStore } from "@reduxjs/toolkit";
import cartReducers from "./reducers/cartReducers";
// import searchReducers from "./reducers/searchReducers";
// import loginReducer from "./reducers/signedInReducers";

export const store = configureStore({
  reducer: {
    cart: cartReducers,
    // search: searchReducers,
    // signedIn: loginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;