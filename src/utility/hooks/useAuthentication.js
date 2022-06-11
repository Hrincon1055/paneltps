// ** Store Imports
import { useDispatch, useSelector } from "react-redux";
import { handleLogin, handleLogout } from "@store/authentication";
import jwtDecode from "jwt-decode";
import axios from "axios";
// INICIO
export const useAuthentication = () => {
  const dispatch = useDispatch();
  const setHandleLogin = async () => {
    const { data } = await axios.get("http://172.23.155.42:4001/api/usuario");
    // const decodedToken = jwtDecode(data.jwt);
    // console.log("useAuthentication LINE 10 =>", decodedToken);
    dispatch(handleLogin(data.jwt));
  };
  const setHandleLogout = () => {
    console.log("useAuthentication LINE 11 =>", "setHandleLogout");
  };

  return { setHandleLogin, setHandleLogout };
};
