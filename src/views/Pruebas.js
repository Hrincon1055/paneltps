/* eslint-disable comma-dangle */
/* eslint-disable semi */
import queryString from "query-string";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Table,
  Container,
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
  CardBody,
  Badge,
  Button,
  CardFooter,
  FormGroup,
  Form,
} from "reactstrap";

import { Bold, RefreshCcw, Share } from "react-feather";
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
    publicados: false,
    sinPublicar: false,
    e11certificados: false,
  });
  const [basicModal, setBasicModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // CONSTANTES
  const { depto } = queryString.parse(location.search);

  const esperados = 66;
  const publicados = 42;
  const sinPublicar = 24;
  const E11certificados = 0;

  // EFFECTS
  useEffect(() => {}, [depto]);

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const getWidhTPercentProgress = (value, total) => {
    return (value / total) * 100;
  };

  const tootlTips = () => {
    return (
      <>
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

  const tootlTipsProgress = () => {
    return (
      <>
        {/* <Tooltip isOpen={true} target="publicadas" toggle={() => {}}>
          {"publicadas"}
        </Tooltip> */}
        {/* <Tooltip isOpen={{}} flip target="e11" toggle={() => {}}>
          {"e11"}
        </Tooltip>
        <Tooltip isOpen={{}} flip target="sin-publicar" toggle={() => {}}>
          {"sin-publicar"}
        </Tooltip> */}
      </>
    );
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
      {/* <Card className="mb-1">
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
      </Card> */}

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

      <Row>
        <Col sm="4" key={1}>
          <Card className="cursor-pointer">
            <CardHeader className="pb-1">
              <CardTitle>
                <div style={{ fontSize: "15px" }}>
                  {" "}
                  # <span style={{ fontWeight: "Bold" }}>{1}</span>
                </div>
              </CardTitle>
              <CardTitle>
                <div style={{ fontSize: "15px" }}>
                  {" "}
                  Esperadas:{" "}
                  <span style={{ fontWeight: "Bold" }}>{esperados}</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardBody className="text-center">
              <CardText>{"ANTIOQUIA"}</CardText>
              <Progress multi style={{ height: "1.157rem" }}>
                <Progress
                  bar
                  animated
                  color="info"
                  value={getWidhTPercentProgress(publicados, esperados)}
                >
                  <span style={{ fontWeight: "bold" }}>{publicados}</span>
                </Progress>
                <Progress
                  bar
                  animated
                  color="warning"
                  value={getWidhTPercentProgress(publicados, sinPublicar)}
                >
                  <span style={{ fontWeight: "bold" }}>{sinPublicar}</span>
                </Progress>
                <Progress
                  bar
                  animated
                  color="danger"
                  value={getWidhTPercentProgress(E11certificados, esperados)}
                >
                  <span style={{ fontWeight: "bold" }}> {E11certificados}</span>
                </Progress>
              </Progress>
            </CardBody>
            <CardFooter>
              {/*               
              <div className="container-flex">
                <div className="item">
                  <Badge color="info" pill className="text-truncate">
                    Publicados
                  </Badge>
                </div>
                <div className="item">
                  <Badge color="warning" pill className="text-truncate">
                    Sin publicar
                  </Badge>
                </div>
                <div className="item">
                  <Badge color="danger" pill className="text-truncate">
                    E11 certificados
                  </Badge>
                </div>
              </div> */}

              <Row className="p-0 m-0">
                <Col
                  xs="4"
                  sm="4"
                  md="4"
                  lg="4"
                  xl="4"
                  className="m-0"
                  style={{ padding: "0 6px 0 0" }}
                >
                  <div id="publicadas">
                    <Badge color="info" pill className="text-truncate full">
                      Publicados
                    </Badge>
                  </div>
                </Col>
                <Col
                  xs="4"
                  sm="4"
                  md="4"
                  lg="4"
                  xl="4"
                  className="m-0"
                  style={{ padding: "0 6px 0 0" }}
                >
                  <Badge color="warning" pill className="full text-truncate">
                    Sin publicar
                  </Badge>
                </Col>
                <Col
                  xs="4"
                  sm="4"
                  md="4"
                  lg="4"
                  xl="4"
                  className="m-0"
                  style={{ padding: "0 6px 0 0" }}
                >
                  <Badge color="danger" pill className="text-truncate full">
                    E11 certificados
                  </Badge>
                </Col>
              </Row>
            </CardFooter>
          </Card>
        </Col>
      </Row>
      {tootlTips()}
      {tootlTipsProgress()}
    </>
  );
};

export default Pruebas;
