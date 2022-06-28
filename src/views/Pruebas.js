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
import {
  filterdSearch,
  getData,
  getWidhTPercentProgress,
  randomInteger,
} from "../utils/utils";
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
  const [departamentos, setDepartamentos] = useState("");

  // CONSTANTES
  const { depto } = queryString.parse(location.search);

  // EFFECTS
  useEffect(() => {
    getData("departamento")
      .then((response) => {
        if (response.status == 200) {
          response.data["data"].forEach((element) => {
            element.tooltipsBadge = {
              publicados: false,
              sinPublicar: false,
              e11certificados: false,
            };
          });
          setDepartamentos(response.data);
        } else {
          throw "Ha ocurrido un error";
        }
      })
      .catch((err) => {
        toast.error("Ha ocurrido un error", err);
        setDepartamentos(null);
      });
  }, [depto]);

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  if (departamentos.data || departamentos) {
    console.log(departamentos.data);
    console.log([...departamentos.data]);
    let data = [...departamentos.data];
    console.log(data[0].tooltipsBadge.publicados);
    // console.log(object);
    // console.log(filterdSearch(departamentos.data, "descripcion", "0"));
  }

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

  const tootlTipsProgress = (id) => {
    return (
      <>
        <Tooltip
          isOpen={departamentos.data[id].tooltipsBadge.publicados}
          target={`publicadas-${id}`}
          toggle={() => {
            let data = { ...departamentos };
            data["data"][id] = {
              ...data["data"][id],
              tooltipsBadge: {
                publicados: !data["data"][id].tooltipsBadge.publicados,
              },
            };
            setDepartamentos(data);
          }}
        >
          {`publicados: ${departamentos.data[id].publicados}`}
        </Tooltip>
        <Tooltip
          isOpen={departamentos.data[id].tooltipsBadge.e11certificados}
          flip
          target={`e11-${id}`}
          toggle={() => {
            let data = { ...departamentos };
            data["data"][id] = {
              ...data["data"][id],
              tooltipsBadge: {
                e11certificados:
                  !data["data"][id].tooltipsBadge.e11certificados,
              },
            };
            setDepartamentos(data);
          }}
        >
          {`e11: ${departamentos.data[id].E11certificados}`}
        </Tooltip>
        <Tooltip
          isOpen={departamentos.data[id].tooltipsBadge.sinPublicar}
          flip
          target={`sin-publicar-${id}`}
          toggle={() => {
            let data = { ...departamentos };
            data["data"][id] = {
              ...data["data"][id],
              tooltipsBadge: {
                sinPublicar: !data["data"][id].tooltipsBadge.sinPublicar,
              },
            };
            setDepartamentos(data);
          }}
        >
          {`Sin publicar: ${departamentos.data[id].sinPublicar}`}
        </Tooltip>
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
                  style={{ width: "80vh" }}
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
      {tootlTips()}
      <Row>
        {departamentos &&
          filterdSearch(departamentos.data, "descripcion", search).map(
            (element, index) => (
              <Col sm="4" key={index}>
                {tootlTipsProgress(index)}
                <Card className="cursor-pointer">
                  <CardHeader className="pb-1">
                    <CardTitle>
                      <div style={{ fontSize: "15px" }}>
                        {" "}
                        #{" "}
                        <span style={{ fontWeight: "Bold" }}>{index + 1}</span>
                      </div>
                    </CardTitle>
                    <CardTitle>
                      <div style={{ fontSize: "15px" }}>
                        {" "}
                        Esperadas:{" "}
                        <span style={{ fontWeight: "Bold" }}>
                          {element.esperados}
                        </span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardBody className="text-center">
                    <CardText>{element.descripcion}</CardText>
                    <Progress multi style={{ height: "1.157rem" }}>
                      <Progress
                        bar
                        animated
                        color="info"
                        value={getWidhTPercentProgress(
                          element.publicados,
                          element.esperados
                        )}
                      >
                        <span style={{ fontWeight: "bold" }}>
                          {element.publicados}
                        </span>
                      </Progress>
                      <Progress
                        bar
                        animated
                        color="warning"
                        value={getWidhTPercentProgress(
                          element.sinPublicar,
                          element.esperados
                        )}
                      >
                        <span style={{ fontWeight: "bold" }}>
                          {element.sinPublicar}
                        </span>
                      </Progress>
                      <Progress
                        bar
                        animated
                        color="danger"
                        value={getWidhTPercentProgress(
                          element.E11certificados,
                          element.esperados
                        )}
                      >
                        <span style={{ fontWeight: "bold" }}>
                          {" "}
                          {element.E11certificados}
                        </span>
                      </Progress>
                    </Progress>
                  </CardBody>
                  <CardFooter>
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
                        <div id={`publicadas-${index}`}>
                          <Badge
                            color="info"
                            pill
                            className="text-truncate full"
                          >
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
                        <div id={`sin-publicar-${index}`}>
                          <Badge
                            color="warning"
                            pill
                            className="full text-truncate"
                          >
                            Sin publicar
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
                        <div id={`e11-${index}`}>
                          <Badge
                            color="danger"
                            pill
                            className="text-truncate full"
                          >
                            E11 certificados
                          </Badge>
                        </div>
                      </Col>
                    </Row>
                  </CardFooter>
                </Card>
              </Col>
            )
          )}
      </Row>
    </>
  );
};

export default Pruebas;
