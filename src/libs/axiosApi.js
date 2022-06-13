import axios from "axios";
import { BASE_URL } from "../utils/constants";

export const axiosApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
