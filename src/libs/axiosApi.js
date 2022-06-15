import axios from "axios";
import { BASE_URL } from "../utils/constants";

export const axiosApi = axios.create({
  baseURL: BASE_URL,
});
export const axiosAuth = async (url, userToken, logout) => {
  if (!userToken) {
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
// export async function authFetch(url, params, logout) {
//   const token = getToken();

//   if (!token) {
//     // Usuario no logeador
//     logout();
//   } else {
//     if (hasExpiredToken(token)) {
//       // Token caducado
//       logout();
//     } else {
//       const paramsTemp = {
//         ...params,
//         headers: {
//           ...params?.headers,
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       try {
//         const response = await fetch(url, paramsTemp);
//         const result = await response.json();
//         return result;
//       } catch (error) {
//         return error;
//       }
//     }
//   }
// }
