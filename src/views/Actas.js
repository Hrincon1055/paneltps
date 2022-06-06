/* eslint-disable comma-dangle */
/* eslint-disable semi */

import { useEffect, useState } from "react";
import {
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
} from "reactstrap";

import axios from "axios";
// const carsInfo = Array(50);
// INICIO
const Actas = () => {
  // STATE
  const [departamentos, setDepartamentos] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  // EFFECT
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("http://localhost:3004/departamentos");
      setDepartamentos(data);
    })();
  }, []);
  const filteredDepartamentos = () => {
    if (search.length === 0) {
      return departamentos.slice(currentPage, currentPage + 9);
    }
    const filterd = departamentos.filter((departamento) => {
      return departamento.departamento
        .toLowerCase()
        .includes(search.toLowerCase());
    });
    return filterd.slice(currentPage, currentPage + 9);
  };
  const nextPage = () => {
    if (
      departamentos.filter((departamento) =>
        departamento.departamento
          .toLowerCase()
          .includes(search.toLocaleLowerCase())
      ).length >
      currentPage + 9
    ) {
      setCurrentPage(currentPage + 9);
    }
  };
  const onSearchChange = (e) => {
    setCurrentPage(0);
    setSearch(e.target.value);
  };
  // RENDER
  return (
    <>
      <Row>
        <Col>
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
            </CardBody>
          </Card>
        </Col>
        <Col>
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
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className="mb-1 justify-content-between gap-1">
        <Col xl="2" md="2" ms="2">
          <div>
            <Input type="select" name="select" id="select-basic">
              <option>E 11</option>
              <option>E 14</option>
            </Input>
          </div>
        </Col>
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
      <Row>
        {departamentos &&
          filteredDepartamentos().map((departamento, i) => (
            <Col sm="4" key={i}>
              <Card className="cursor-pointer">
                <CardHeader>
                  <Row>
                    <CardTitle>Actas</CardTitle>
                    <p>13.123</p>
                  </Row>
                  <Row className="text-end">
                    <CardTitle>Región</CardTitle>
                    <p>3</p>
                  </Row>
                </CardHeader>
                <CardBody className="text-center">
                  <CardText>{departamento.departamento.toUpperCase()}</CardText>
                </CardBody>
                <CardFooter className="text-muted">
                  <Row className="mb-1">
                    <Col>
                      <span>Completadas {departamento.avance}%</span>
                      <Progress
                        color="info"
                        style={{ height: "5px" }}
                        value={departamento.avance}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <span style={{ fontSize: "12px" }}>
                        Incompletas {departamento.avance}%
                      </span>
                      <Progress
                        color="warning"
                        style={{ height: "5px" }}
                        value={departamento.avance}
                      />
                    </Col>
                    <Col>
                      <span style={{ fontSize: "12px" }}>
                        Faltantes {departamento.avance}%
                      </span>
                      <Progress
                        color="danger"
                        style={{ height: "5px" }}
                        value={departamento.avance}
                      />
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          ))}
      </Row>
    </>
  );
};

export default Actas;
