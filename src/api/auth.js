import jwtDecode from "jwt-decode";
import { ACCESS_TOKEN } from "../utils/constants";
// INICIO
export const accessTokenApi = () => {
  const accessToken = window.sessionStorage.getItem(ACCESS_TOKEN) || null;
  return willExpireToken(accessToken) ? JSON.parse(accessToken) : null;
};
const willExpireToken = (token) => {
  if (!token) {
    return false;
  }
  const seconds = 60;
  const metaToken = jwtDecode(token);
  const { exp } = metaToken;
  const now = (Date.now() + seconds) / 1000;
  return now < exp;
};
