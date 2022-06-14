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
  Col,
  Label,
  Input,
  Row,
  Tooltip,
} from "reactstrap";
import { Share } from "react-feather";
import { toast } from "react-toastify";
// MIS COMPONENTES
import { axiosApi } from "../libs/axiosApi";
import { PATHS_API } from "../utils/constants";

// INICIO
const Ciudades = () => {
  // HOOKS
  const location = useLocation();
  const history = useHistory();

  // STATE
  const [ciudades, setCiudades] = useState(null);
  const [totales, setTotales] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [basicModal, setBasicModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // CONSTANTES
  const { depto } = queryString.parse(location.search);

  // EFFECTS
  useEffect(() => {
    console.log(`${PATHS_API.ciudad}?depto=${depto}`);
    axiosApi
      .get(`${PATHS_API.ciudad}?depto=${depto}`)
      .then((response) => {
        // setTotales(response);

        if (response.status == 200) {
          console.log(response);
          setCiudades(response.data);
          // setTotales(response.data);
          // setDepartamentos(response.data.departamentos);
          // setIsLoading(false);
        } else {
          // toast.warn("Ha ocurrido un error");
          // setTotales(null);
          // setDepartamentos(null);
          // setIsLoading(false);
          throw "Ha ocurrido un error";
        }

        // console.log(response);
        // console.log(response);
      })
      .catch((err) => {});
  }, [depto]);

  const filteredCiudades = () => {
    const data = ciudades;
    if (data) {
      if (search.length === 0) {
        return data.departamentos.slice(currentPage, currentPage + 50);
      }

      const filterd = data.departamentos.filter((ciudad) =>
        ciudad.descripcion.toLowerCase().includes(search.toLowerCase())
      );

      return filterd;
    }
  };

  const onSearchChange = (e) => {
    setCurrentPage(0);
    setSearch(e.target.value);
  };

  // RENDER
  return (
    <>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">Server Side</CardTitle>
          <CardTitle tag="h4">
            <div id="TooltipExample">
              <Share className="icon-modal" size={30} />
            </div>
            <Tooltip flip target="TooltipExample">
              {"Avance publicadas"}
            </Tooltip>
          </CardTitle>
        </CardHeader>
        <Row className="mb-1 justify-content-between gap-1 p-1">
          <Col xl="2" md="2" ms="2"></Col>
          <Col
            className="d-flex align-items-center justify-content-sm-end mt-sm-0"
            sm="12"
            md="6"
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
              filteredCiudades().map((ciudad, index) => (
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
              ))}

            {ciudades && (
              <tr className="table-primary">
                <td></td>
                <td>TOTALES</td>
                <td>{ciudades.sumEsperados}</td>
                <td>{ciudades.sumPublicados}</td>
                <td>{ciudades.promAvance}</td>
                {/* <td>
                  <span>{ciudades.promAvance}%</span>
                  <Progress value={ciudades.promAvance} />
                </td> */}
                <td>{ciudades.sumSinPublicar}</td>
                <td>{ciudades.sumE11Certificados}</td>
                <td>{ciudades.sumfaltantes}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
    </>
  );
};

export default Ciudades;
