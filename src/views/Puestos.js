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
const Puestos = () => {
  // HOOKS
  const location = useLocation();
  const history = useHistory();
  const { setHandleLogout } = useAuthentication();

  // STATE
  const [puestos, setPuestos] = useState(null);
  const [search, setSearch] = useState("");
  const [tooltipOpen, setTooltipOpen] = useState({
    refresh: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  // CONSTANTES
  const { depto, ciudad, zona, descrip } = queryString.parse(location.search);

  // EFFECTS
  useEffect(() => {
    setTooltipOpen({ refresh: false });
    setIsLoading(true);
    axiosApi
      .get(`${PATHS_API.puesto}?depto=${depto}&ciudad=${ciudad}&zona=${zona}`)
      .then((response) => {
        if (response.status == 200) {
          console.log(response.data);
          setPuestos(response.data);
          setIsLoading(false);
        } else {
          // toast.warn("Ha ocurrido un error");
          throw "Ha ocurrido un error";
        }
      })
      .catch((err) => {
        toast.error("Ha ocurrido un error", err);
        setPuestos(null);
        setIsLoading(false);
      });
    setRefresh(false);
  }, [depto, ciudad, zona, refresh]);

  // FUNCIONES
  const handleClick = (
    idDepartamento,
    idCiudad,
    idZona,
    idPuesto,
    nombrePuesto
  ) => {
    history.push(
      `/mesas?depto=${idDepartamento}&ciudad=${idCiudad}&zona=${idZona}&puesto=${idPuesto}&descrip=${nombrePuesto}`
    );
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
          <CardTitle tag="h6">Puestos de {descrip}</CardTitle>
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
              <th>Puesto</th>
              <th>Esperados</th>
              <th>Publicados</th>
              <th>#Avance</th>
              <th>Sin Publicar</th>
              <th>E11 Certificados</th>
              <th>Faltantes</th>
            </tr>
          </thead>
          <tbody>
            {puestos &&
              filterdSearch(puestos.data, "descripcion", search).map(
                (puesto, index) => (
                  <tr
                    key={index}
                    onClick={() =>
                      handleClick(
                        depto,
                        ciudad,
                        zona,
                        puesto.municipio,
                        "nombre puesto"
                      )
                    }
                  >
                    <td>{puesto.municipio}</td>
                    <td>{puesto.descripcion.toUpperCase()}</td>
                    <td>{puesto.esperados}</td>
                    <td>{puesto.publicados}</td>
                    <td>
                      <span>{puesto.avance}%</span>
                      <Progress value={puesto.avance} />
                    </td>
                    <td>{puesto.sinPublicar}</td>
                    <td>{puesto.e11Certificados}</td>
                    <td>{puesto.faltantes}</td>
                  </tr>
                )
              )}

            {puestos && (
              <tr className="table-primary">
                <td></td>
                <td>TOTALES</td>
                <td>{puestos.sumEsperados}</td>
                <td>{puestos.sumPublicados}</td>
                <td>
                  <span>{puestos.promAvance}%</span>
                  <Progress value={puestos.promAvance} />
                </td>
                <td>{puestos.sumSinPublicar}</td>
                <td>{puestos.sumE11Certificados}</td>
                <td>{puestos.sumfaltantes}</td>
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

export default Puestos;
