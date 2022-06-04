import { useState } from "react";
import { fetchDatos } from "../helpers/fetchDatos";
// INICIO
export const useData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [departamentos, setDepartamentos] = useState([]);
  useEffect(() => {
    fetchDatos().then((response) => {
      setIsLoading(false);
      setDepartamentos(response);
    });
  }, []);
  return {
    isLoading,
    departamentos,
  };
};
