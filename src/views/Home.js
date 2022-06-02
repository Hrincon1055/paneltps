/* eslint-disable comma-dangle */
/* eslint-disable semi */
import { useEffect, useState } from "react";
import { Table, Breadcrumb, BreadcrumbItem, Progress } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

// INICIO
const Home = () => {
  // HOOKS
  const history = useHistory();
  // STATE
  const [departamentos, setDepartamentos] = useState(null);
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
  // RENDER
  return (
    <>
      <Breadcrumb className="breadcrumb-slash">
        <BreadcrumbItem>
          <Link to="#"> Home </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to="#"> municipios </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to="#"> zonas </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to="#"> puestos </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to="#"> mesas </Link>
        </BreadcrumbItem>
      </Breadcrumb>

      <div className="input-group">
        <div className="form-outline">
          <input type="search" clasNames="form-control" />
          <label className="form-label">Search</label>
        </div>
        <button type="button" className="btn btn-primary">
          <i className="fas fa-search"></i>
        </button>
      </div>

      <Table hover responsive className="mt-1">
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
            departamentos.map((departamento, index) => (
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
    </>
  );
};

export default Home;
