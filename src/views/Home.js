/* eslint-disable comma-dangle */
/* eslint-disable semi */
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
} from "reactstrap";
import { useHistory } from "react-router-dom";

import axios from "axios";

// INICIO
const Home = () => {
  // HOOKS
  const history = useHistory();
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
  // FUNCIONES

  const handleClick = () => {
    history.push(`/municipios?zona=xxx`);
  };
  const filteredDepartamentos = () => {
    if (search.length === 0) {
      return departamentos.slice(currentPage, currentPage + 5);
    }
    const filterd = departamentos.filter((departamento) => {
      return departamento.departamento
        .toLowerCase()
        .includes(search.toLowerCase());
    });
    return filterd.slice(currentPage, currentPage + 5);
  };
  const nextPage = () => {
    if (
      departamentos.filter((departamento) =>
        departamento.departamento
          .toLowerCase()
          .includes(search.toLocaleLowerCase())
      ).length >
      currentPage + 5
    ) {
      setCurrentPage(currentPage + 5);
    }
  };
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 5);
    }
  };
  const onSearchChange = (e) => {
    setCurrentPage(0);
    setSearch(e.target.value);
  };
  // RENDER
  return (
    <>
      <Card className="mt-1">
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">Server Side</CardTitle>
        </CardHeader>
        <Row className="mx-0 mt-1 mb-50 justify-content-between">
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
        <Table hover responsive>
          <thead>
            <tr>
              <th>Departamento</th>
              <th>Esperados</th>
              <th>Publicados</th>
              <th>#Avance</th>
              <th>Sin Publicar</th>
              <th>E11 Certificados</th>
              <th>Faltantes</th>
            </tr>
          </thead>
          <tbody>
            {departamentos &&
              filteredDepartamentos().map((departamento, index) => (
                <tr onClick={handleClick} key={index}>
                  <td>{departamento.departamento.toUpperCase()}</td>
                  <td>{departamento.esperados}</td>
                  <td>{departamento.publicados}</td>
                  <td>
                    <span>{departamento.avance}%</span>
                    <Progress value={departamento.avance} />
                  </td>
                  <td>{departamento.sin_publicar}</td>
                  <td>{departamento.e11_cerificados}</td>
                  <td>{departamento.faltantes}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Card>
      <div>
        <Button color="primary" className="m-1" onClick={prevPage}>
          Anterior
        </Button>
        <Button color="primary" onClick={nextPage}>
          Siguiente
        </Button>
      </div>
    </>
  );
};

export default Home;
