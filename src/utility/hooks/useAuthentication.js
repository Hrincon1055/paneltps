// ** Store Imports
import { useDispatch, useSelector } from "react-redux";
import { handleLogin, handleLogout } from "@store/authentication";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { axiosApi } from "../../libs/axiosApi";
import { PATHS_API } from "../../utils/constants";
// INICIO
export const useAuthentication = () => {
  const dispatch = useDispatch();
  const setHandleLogin = (token) => {
    dispatch(handleLogin(token));
  };
  const setHandleLogout = () => {
    console.log("useAuthentication LINE 11 =>", "setHandleLogout");
  };

  return { setHandleLogin, setHandleLogout };
};
