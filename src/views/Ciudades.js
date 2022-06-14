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
  Button,
  Spinner,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tooltip,
} from "reactstrap";
import { Share } from "react-feather";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
} from "chart.js";
import { toast } from "react-toastify";
// MIS COMPONENTES
import { axiosApi } from "../libs/axiosApi";
import { PATHS_API } from "../utils/constants";

ChartJS.register(
  ChartDataLabels,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend
);

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
  const parsed = queryString.parse(location.search);

  // EFFECTS
  useEffect(() => {
    console.log(`${PATHS_API.ciudad}?depto=${parsed.depto}`);
    axiosApi
      .get(`${PATHS_API.ciudad}?depto=${parsed.depto}`)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {});
  }, []);
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
            <tr className="table-primary">
              <td>TOTALES</td>
              <td>{"total"}</td>
              <td>{"total"}</td>
              <td>{"total"}</td>
              <td>{"total"}</td>
              <td>{"total"}</td>
              <td>{"total"}</td>
              <td>{"total"}</td>
            </tr>
          </tbody>
        </Table>
      </Card>
    </>
  );
};

export default Ciudades;
