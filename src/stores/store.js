import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import loginReducer from "./loginSlice";
import { backendApi } from "../services/backendApi";
export const store = configureStore({
  reducer: {
    [backendApi.reducerPath]: backendApi.reducer,

    login: loginReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(backendApi.middleware),
  devTools: true,
});
setupListeners(store.dispatch);
