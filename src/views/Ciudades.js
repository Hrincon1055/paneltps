/* eslint-disable comma-dangle */
/* eslint-disable semi */
import queryString from "query-string";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Table,
  Progress,
  Card,
  CardTitle,
  CardHeader,
  CardText,
  Col,
  Label,
  Input,
  Row,
  Tooltip,
  Spinner,
} from "reactstrap";
import { RefreshCcw, Share } from "react-feather";
import { toast } from "react-toastify";
// MIS COMPONENTES
import { axiosApi } from "../libs/axiosApi";
import { PATHS_API } from "../utils/constants";
import { filterdSearch } from "../utils/utils";
import { useAuthentication } from "@hooks/useAuthentication";

// INICIO
const Ciudades = () => {
  // HOOKS
  const location = useLocation();
  const history = useHistory();
  const { setHandleLogout } = useAuthentication();

  // STATE
  const [ciudades, setCiudades] = useState(null);
  const [search, setSearch] = useState("");
  const [tooltipOpen, setTooltipOpen] = useState({
    refresh: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  // CONSTANTES
  const { depto } = queryString.parse(location.search);

  // EFFECTS
  useEffect(() => {
    setTooltipOpen({ refresh: false });
    setIsLoading(true);
    axiosApi
      .get(`${PATHS_API.ciudad}?depto=${depto}`)
      .then((response) => {
        if (response.status == 200) {
          console.log(response.data);
          setCiudades(response.data);
          setIsLoading(false);
        } else {
          // toast.warn("Ha ocurrido un error");
          throw "Ha ocurrido un error";
        }
      })
      .catch((err) => {
        toast.error("Ha ocurrido un error", err);
        setCiudades(null);
        setIsLoading(false);
      });
    setRefresh(false);
  }, [depto, refresh]);

  // FUNCIONES
  const handleClick = (idDepartamento, idCiudad) => {
    history.push(`/zonas?depto=${idDepartamento}&ciudad=${idCiudad}`);
  };

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

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
  return (
    <>
      <Card className="mb-1">
        <CardHeader className="border-bottom">
          <CardTitle tag="h6">Ciudades de ....</CardTitle>
        </CardHeader>

        <CardHeader className="border-bottom">
          <CardTitle>
            <div className="d-flex align-items-center">
              <Label className="me-1" for="search-input">
                Search
              </Label>
              <Input
                className="dataTable-filter"
                type="text"
                bsSize="md"
                name="search"
                id="search"
                value={search}
                onChange={(e) => onSearchChange(e)}
                style={{ width: "80vh" }}
              />
            </div>
          </CardTitle>
          <CardTitle>
            <Row>
              <Col>
                <div id="refresh" onClick={() => setRefresh(true)}>
                  <RefreshCcw className="icon-modal" size={30} />
                </div>
              </Col>
            </Row>
          </CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <Table hover responsive>
          <thead>
            <tr>
              <th>Código</th>
              <th>Municipio</th>
              <th>Esperados</th>
              <th>Publicados</th>
              <th>#Avance</th>
              <th>Sin Publicar</th>
              <th>E11 Certificados</th>
              <th>Faltantes</th>
            </tr>
          </thead>
          <tbody>
            {ciudades &&
              filterdSearch(ciudades.data, "descripcion", search).map(
                (ciudad, index) => (
                  <tr
                    key={index}
                    onClick={() => handleClick(depto, ciudad.municipio)}
                  >
                    <td>{ciudad.municipio}</td>
                    <td>{ciudad.descripcion.toUpperCase()}</td>
                    <td>{ciudad.esperados}</td>
                    <td>{ciudad.publicados}</td>
                    <td>
                      <span>{ciudad.avance}%</span>
                      <Progress value={ciudad.avance} />
                    </td>
                    <td>{ciudad.sinPublicar}</td>
                    <td>{ciudad.e11Certificados}</td>
                    <td>{ciudad.faltantes}</td>
                  </tr>
                )
              )}

            {ciudades && (
              <tr className="table-primary">
                <td></td>
                <td>TOTALES</td>
                <td>{ciudades.sumEsperados}</td>
                <td>{ciudades.sumPublicados}</td>
                <td>
                  <span>{ciudades.promAvance}%</span>
                  <Progress value={ciudades.promAvance} />
                </td>
                <td>{ciudades.sumSinPublicar}</td>
                <td>{ciudades.sumE11Certificados}</td>
                <td>{ciudades.sumfaltantes}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>

      <Tooltip
        isOpen={tooltipOpen.refresh}
        flip
        target="refresh"
        toggle={() => {
          setTooltipOpen({ refresh: !tooltipOpen.refresh });
        }}
      >
        {"Refrescar tabla"}
      </Tooltip>
    </>
  );
};

export default Ciudades;
