/* eslint-disable comma-dangle */
/* eslint-disable semi */

import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Input,
  Label,
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
              <CardTitle>Create Awesome</CardTitle>
            </CardHeader>
            <CardBody>
              <CardText>This is your second page.</CardText>
              <CardText>
                Chocolate sesame snaps pie carrot cake pastry pie lollipop
                muffin. Carrot cake dragée chupa chups jujubes. Macaroon
                liquorice cookie wafer tart marzipan bonbon. Gingerbread jelly-o
                dragée chocolate.
              </CardText>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card>
            <CardHeader>
              <CardTitle>Create Awesome</CardTitle>
            </CardHeader>
            <CardBody>
              <CardText>This is your second page.</CardText>
              <CardText>
                Chocolate sesame snaps pie carrot cake pastry pie lollipop
                muffin. Carrot cake dragée chupa chups jujubes. Macaroon
                liquorice cookie wafer tart marzipan bonbon. Gingerbread jelly-o
                dragée chocolate.
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className="mx-0 m-1  justify-content-between">
        <Col xl="2" md="2" ms="2">
          <div>
            <Input type="select" name="select" id="select-basic">
              <option>E 11</option>
              <option>E 14</option>
            </Input>
          </div>
        </Col>
        <Col
          className="d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1"
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
              <Card>
                <CardHeader>
                  <CardTitle>Create Awesome</CardTitle>
                </CardHeader>
                <CardBody>
                  <CardText>This is your second page.</CardText>
                  <CardText>
                    Chocolate sesame snaps pie carrot cake pastry pie lollipop
                    muffin. Carrot cake dragée chupa chups jujubes
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          ))}
      </Row>
    </>
  );
};

export default Actas;
