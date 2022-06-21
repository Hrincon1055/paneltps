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
  FormGroup,
  Form,
} from "reactstrap";
import { RefreshCcw, Share } from "react-feather";
import { toast } from "react-toastify";
// MIS COMPONENTES
import { axiosApi } from "../libs/axiosApi";
import { PATHS_API } from "../utils/constants";
import { filterdSearch } from "../utils/utils";
import { useAuthentication } from "@hooks/useAuthentication";

// INICIO
const Pruebas = () => {
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
  useEffect(() => {}, [depto]);

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
          <CardTitle tag="h6">Departamentos</CardTitle>
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
      </Card>

      <Card className="mb-1">
        <CardHeader className="border-bottom">
          <CardTitle>Departamentos</CardTitle>
          <CardTitle>
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
      </Card>

      <Card>
        <CardHeader className="border-bottom">
          <CardTitle>
            <Row className="justify-content-between">
              <Col className="d-flex align-items-center">
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
          </CardTitle>
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

export default Pruebas;
