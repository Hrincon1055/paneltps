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
const Mesas = () => {
  // HOOKS
  const location = useLocation();
  const history = useHistory();
  const { setHandleLogout } = useAuthentication();

  // STATE
  const [mesas, setMesas] = useState(null);
  const [search, setSearch] = useState("");
  const [tooltipOpen, setTooltipOpen] = useState({
    refresh: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  // CONSTANTES
  const { depto, ciudad, zona, puesto } = queryString.parse(location.search);

  // EFFECTS
  useEffect(() => {
    setTooltipOpen({ refresh: false });
    setIsLoading(true);
    axiosApi
      .get(
        `${PATHS_API.mesa}?depto=${depto}&ciudad=${ciudad}&zona=${zona}&puesto=${puesto}`
      )
      .then((response) => {
        if (response.status == 200) {
          // if()
          // console.log(response);
          setMesas(response.data);
          setIsLoading(false);
        } else {
          // toast.warn("Ha ocurrido un error");
          throw "Ha ocurrido un error";
        }
      })
      .catch((err) => {
        toast.error("Ha ocurrido un error", err);
        setMesas(null);
        setIsLoading(false);
      });
    setRefresh(false);
  }, [depto, ciudad, zona, puesto, refresh]);

  // FUNCIONES
  const handleClick = (idDepartamento, idCiudad, idZona, idPuesto) => {};
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
          <CardTitle tag="h6">Mesas de ....</CardTitle>
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
            {mesas &&
              filterdSearch(mesas.data, "descripcion", search).map(
                (mesa, index) => (
                  <tr
                    key={index}
                    onClick={() => handleClick(depto, ciudad, zona, puesto)}
                  >
                    <td>{mesa.municipio}</td>
                    <td>{mesa.descripcion.toUpperCase()}</td>
                    <td>{mesa.esperados}</td>
                    <td>{pumesaesto.publicados}</td>
                    <td>
                      <span>{mesa.avance}%</span>
                      <Progress value={mesa.avance} />
                    </td>
                    <td>{mesa.sinPublicar}</td>
                    <td>{mesa.e11Certificados}</td>
                    <td>{mesa.faltantes}</td>
                  </tr>
                )
              )}

            {mesas && (
              <tr className="table-primary">
                <td></td>
                <td>TOTALES</td>
                <td>{mesas.sumEsperados}</td>
                <td>{mesas.sumPublicados}</td>
                <td>
                  <span>{mesas.promAvance}%</span>
                  <Progress value={mesas.promAvance} />
                </td>
                <td>{mesas.sumSinPublicar}</td>
                <td>{mesas.sumE11Certificados}</td>
                <td>{mesas.sumfaltantes}</td>
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

export default Mesas;
