import { createSlice } from "@reduxjs/toolkit";
// MIS COMPONENTES
import { accessTokenApi } from "../api/auth";
import { ACCESS_TOKEN } from "../utils/constants";

// INICIO
export const authSlice = createSlice({
  name: "authentication",
  initialState: {
    userToken: accessTokenApi(),
  },
  reducers: {
    handleLogin: (state, action) => {
      state.userToken = action.payload;
      sessionStorage.setItem(ACCESS_TOKEN, JSON.stringify(action.payload));
      console.log("authentication LINE 23 =>", state.userToken);
      // state[config.storageTokenKeyName] =
      //   action.payload[config.storageTokenKeyName];
      // state[config.storageRefreshTokenKeyName] =
      //   action.payload[config.storageRefreshTokenKeyName];
      // localStorage.setItem("userData", JSON.stringify(action.payload));
      // localStorage.setItem(
      //   config.storageTokenKeyName,
      //   JSON.stringify(action.payload.accessToken)
      // );
      // localStorage.setItem(
      //   config.storageRefreshTokenKeyName,
      //   JSON.stringify(action.payload.refreshToken)
      // );
    },
    handleLogout: (state) => {
      // state.userData = {};
      // state[config.storageTokenKeyName] = null;
      // state[config.storageRefreshTokenKeyName] = null;
      // Remove user, accessToken & refreshToken from localStorage
      // localStorage.removeItem("userData");
      // localStorage.removeItem(config.storageTokenKeyName);
      // localStorage.removeItem(config.storageRefreshTokenKeyName);
    },
  },
});
export const { handleLogin, handleLogout } = authSlice.actions;

export default authSlice.reducer;
