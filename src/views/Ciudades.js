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
    avance: false,
    refresh: false,
  });
  const [basicModal, setBasicModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // CONSTANTES
  const { depto } = queryString.parse(location.search);

  // EFFECTS
  useEffect(() => {
    setIsLoading(true);
    axiosApi
      .get(`${PATHS_API.ciudad}?depto=${depto}`)
      .then((response) => {
        if (response.status == 200) {
          // console.log(response.data);
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
  }, [depto]);

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
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">Server Side</CardTitle>
          <CardTitle tag="h4">
            <Row>
              <Col>
                <div id="avance">
                  <Share className="icon-modal" size={30} />
                </div>
              </Col>
              <Col>
                <div id="refresh">
                  <RefreshCcw className="icon-modal" size={30} />
                </div>
              </Col>
            </Row>
          </CardTitle>
        </CardHeader>

        <Row className="mb-1 justify-content-between gap-1 p-1">
          <Col
            className="d-flex align-items-center justify-content-sm-end mt-sm-0"
            sm="12"
            md="4"
          >
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
            />
          </Col>

          <Col className="d-flex" md="5">
            <Row>
              <Col>
                <div id="avance">
                  <Share className="icon-modal" size={30} />
                </div>
              </Col>
              <Col>
                <div id="refresh">
                  <RefreshCcw className="icon-modal" size={30} />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

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
                  <tr key={index}>
                    <td>{"co"}</td>
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
        isOpen={tooltipOpen.avance}
        flip
        target="avance"
        toggle={() => {
          setTooltipOpen({ avance: !tooltipOpen.avance });
        }}
      >
        {"Avance publicadas"}
      </Tooltip>

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
