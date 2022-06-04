import axios from "axios";

export const datosApi = axios.create({ baseURL: "http://localhost:3004" });
