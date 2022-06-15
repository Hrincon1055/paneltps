// ** Store Imports
import { useDispatch } from "react-redux";
import { handleLogin, handleLogout } from "@store/authentication";

// INICIO
export const useAuthentication = () => {
  const dispatch = useDispatch();
  const setHandleLogin = (token) => {
    dispatch(handleLogin(token));
  };
  const setHandleLogout = () => {
    console.log("useAuthentication LINE 15 =>", "setHandleLogout");
    dispatch(handleLogout());
  };

  return { setHandleLogin, setHandleLogout };
};
