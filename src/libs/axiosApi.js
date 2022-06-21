import axios from "axios";
import { accessTokenApi } from "../api/auth";
import { BASE_URL } from "../utils/constants";

export const axiosApi = axios.create({
  baseURL: BASE_URL,
});

axiosApi.interceptors.request.use(
  (config) => {
    if (accessTokenApi()) {
      config.headers.Authorization = `Bearer ${accessTokenApi()}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject();
  }
);

export const axiosAuth = async (url, userToken, setHandleLogout) => {
  if (!userToken) {
    console.log("axiosApi LINE 12 =>");
    setHandleLogout();
  } else {
    try {
      const response = await axiosApi({
        method: "get",
        url,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      return response;
    } catch (error) {
      return error;
    }
  }
};

// // Inicio
