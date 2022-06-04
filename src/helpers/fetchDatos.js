import { datosApi } from "../api/getDatos";

export const fetchDatos = async () => {
  const { data } = await datosApi.get("/departamentos");
  return data;
};
