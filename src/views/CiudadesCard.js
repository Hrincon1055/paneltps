import { useEffect, useState } from "react";
import queryString from "query-string";
import { Link, useLocation, useHistory } from "react-router-dom";
import { Spinner } from "reactstrap";
import { toast } from "react-toastify";
// MIS COMPONENTES
import { axiosApi } from "../libs/axiosApi";
import { PATHS_API } from "../utils/constants";
// INICIO

export const CiudadesCard = () => {
  const location = useLocation();
  // STATE
  const [isLoading, setIsLoading] = useState(false);
  const [ciudades, setCiudades] = useState(null);
  console.log("CiudadesCard LINE 16 =>", ciudades);
  // CONSTANTES
  const { depto } = queryString.parse(location.search);
  // EFFECTS
  useEffect(() => {
    setIsLoading(true);
    axiosApi
      .get(`${PATHS_API.ciudad}?depto=${depto}`)
      .then((response) => {
        setIsLoading(false);
        setCiudades(response.data.departamentos);
      })
      .catch((err) => {
        toast.error("Ha ocurrido un error");
        setIsLoading(false);
      });
  }, [depto]);
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-content-center mt-4">
        <Spinner color="primary" size="">
          Loading...
        </Spinner>
      </div>
    );
  }
  // RENDER
  return <div>CiudadesCard</div>;
};

export default CiudadesCard;
