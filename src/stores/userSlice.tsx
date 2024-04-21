import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const initialState = {
  isLoggedIn: false,
  login: "",
  email: "",
};

const sliceLogin = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.login = action.payload.login;
      state.email = action.payload.email;
    },
    logout: (state, action) => {
      Cookies.remove("token");
      state.isLoggedIn = false;
      state.login = "";
      state.email = "";
    },
  },
});

export const { login, logout } = sliceLogin.actions;
export default sliceLogin.reducer;
