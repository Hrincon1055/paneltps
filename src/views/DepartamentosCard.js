import { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Input,
  Label,
  Progress,
  Row,
  Spinner,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { RefreshCcw } from "react-feather";
// MIS COMPONENTES
import { axiosApi } from "../libs/axiosApi";
import { PATHS_API } from "../utils/constants";

// INICIO
const DepartamentosCard = () => {
  // HOOKS
  const history = useHistory();
  // STATE
  const [departamentos, setDepartamentos] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totales, setTotales] = useState(null);

  // const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");

  // EFFECT
  useEffect(() => {
    setIsLoading(true);
    axiosApi
      .get(PATHS_API.departamentos)
      .then((response) => {
        if (response.status == 200) {
          setTotales(response.data);
          setDepartamentos(response.data.departamentos);
          setIsLoading(false);
        } else {
          throw "Ha ocurrido un error";
        }
      })
      .catch((err) => {
        toast.error("Ha ocurrido un error", err);
        setTotales(null);
        setDepartamentos([]);
        setIsLoading(false);
      });
  }, []);
  // FUNCIONES
  const filteredDepartamentos = () => {
    const filterd = departamentos.filter((departamento) => {
      return departamento.descripcion
        .toLowerCase()
        .includes(search.toLowerCase());
    });
    return filterd;
  };

  const handleClick = (idDepartamento) => {
    console.log("DepartamentosCard LINE 66 =>", idDepartamento);
    history.push(`/ciudades-card?depto=${idDepartamento}`);
  };
  const onSearchChange = (e) => {
    // setCurrentPage(0);
    setSearch(e.target.value);
  };

  // RENDER

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-content-center mt-4">
        <Spinner color="primary" size="">
          Loading...
        </Spinner>
      </div>
    );
  }
  return (
    <>
      <Row>
        <Col lg="6" md="6" ms="4">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Create Awesome</CardTitle>
            </CardHeader>
            <CardBody>
              <Progress multi>
                <Progress bar color="info" value="15" />
                <Progress bar color="warning" value="20" />
                <Progress bar color="danger" value="15" />
              </Progress>
              <div className="d-flex justify-content-center mt-1 gap-1 flex-md-row flex-lg-row">
                <Badge color="info" pill>
                  Completadas
                </Badge>
                <Badge pill color="warning">
                  Incompletas
                </Badge>
                <Badge color="danger" pill>
                  Faltantes
                </Badge>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col lg="6" md="6" ms="4">
          <Card>
            <CardHeader>
              <CardTitle>Create Awesome</CardTitle>
            </CardHeader>
            <CardBody>
              <Progress multi>
                <Progress bar color="info" value="15" />
                <Progress bar color="warning" value="20" />
                <Progress bar color="danger" value="15" />
              </Progress>
              <div className="d-flex justify-content-center mt-1 gap-1 flex-md-row flex-lg-row">
                <Badge color="info" pill>
                  Completadas
                </Badge>
                <Badge pill color="warning">
                  Incompletas
                </Badge>
                <Badge color="danger" pill>
                  Faltantes
                </Badge>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className="mb-1 justify-content-between gap-1">
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
        <Col xl="2" md="2" ms="12">
          <div>
            <Button block color="primary">
              <RefreshCcw />
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        {departamentos &&
          filteredDepartamentos().map((departamento) => (
            <Col sm="4" key={departamento.codepar}>
              <Card
                className="cursor-pointer"
                onClick={() => handleClick(departamento.codepar)}
              >
                <CardHeader>
                  <Row>
                    <CardTitle>Esperadas</CardTitle>
                    <p>{departamento.esperados}</p>
                  </Row>
                  <Row className="text-end">
                    <CardTitle>#</CardTitle>
                    <p>{departamento.codepar}</p>
                  </Row>
                </CardHeader>
                <CardBody className="text-center">
                  <CardText>{departamento.descripcion.toUpperCase()}</CardText>
                </CardBody>
                <CardFooter className="text-muted">
                  <Row className="mb-1">
                    <Col>
                      <span>Publicados {departamento.publicados}%</span>
                      <Progress
                        color="info"
                        style={{ height: "8px" }}
                        value={departamento.publicados}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <span style={{ fontSize: "12px" }}>
                        Sin Publicar {departamento.sinPublicar}%
                      </span>
                      <Progress
                        color="warning"
                        style={{ height: "8px" }}
                        value={departamento.sinPublicar}
                      />
                    </Col>
                    <Col>
                      <span style={{ fontSize: "12px" }}>
                        Faltantes {departamento.faltantes}%
                      </span>
                      <Progress
                        color="danger"
                        style={{ height: "8px" }}
                        value={departamento.faltantes}
                      />
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          ))}
        {/* <div>
          <Button color="primary" className="m-1" onClick={prevPage}>
            Anterior
          </Button>
          <Button color="primary" onClick={nextPage}>
            Siguiente
          </Button>
        </div> */}
      </Row>
    </>
  );
};

export default DepartamentosCard;
