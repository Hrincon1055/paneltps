import axios from "axios";
import { BASE_URL } from "../utils/constants";

export const axiosApi = axios.create({
  baseURL: BASE_URL,
});
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
