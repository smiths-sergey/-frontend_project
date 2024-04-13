import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const initialState = {
  isLoggedIn: !!Cookies.get("token"),
};
const sliceLogin = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
    },
    logout: (state, action) => {
      Cookies.remove("token");
      state.isLoggedIn = false;
    },
    checkLoggedIn: (state, action) => {
      if (!Cookies.get("token")) {
        state.isLoggedIn = false;
      } else {
        state.isLoggedIn = true;
      }
    },
  },
});

export const { login, logout, checkLoggedIn } = sliceLogin.actions;
export default sliceLogin.reducer;
