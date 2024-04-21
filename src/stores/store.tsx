import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userReducer from "./userSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
  },

  devTools: true,
});
setupListeners(store.dispatch);
