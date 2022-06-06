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
  Spinner,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tooltip,
} from "reactstrap";
import { useHistory } from "react-router-dom";

import { Share } from 'react-feather'

import axios from "axios";
import { Bar } from "react-chartjs-2";

const labels = ['enero', 'febrero'];
const data = {
  labels: labels,
  datasets: [
    {
      label: 'Completos',
      data: [65, 67, 68],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderWidth: 1
    },
  ]
};

const config = {
  type: 'bar',
  data: data,
  options: {
    // indexAxis: 'y',
    plugins: {
      legend: {
        display: false,
        // position: 'bottom',
        // labels: {
        //     usePointStyle: true,
        //     pointStyle:'circle'
        // }
      },
      title: {
        display: false,
        text: 'Chart.js Bar Chart - Stacked'
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  }
};

// INICIO
const Home = () => {
  // HOOKS
  const history = useHistory();
  // STATE
  const [departamentos, setDepartamentos] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [basicModal, setBasicModal] = useState(false)

  // EFFECT
  useEffect(() => {
    setTimeout(() => {
      (async () => {
        const { data } = await axios.get("http://localhost:3004/departamentos");
        setDepartamentos(data);
      })();
    }, 500);
  }, []);
  // FUNCIONES
  const handleClick = () => {
    history.push(`/municipios?zona=xxx`);
  };

  const handleOpenModal = () => {
    // console.log("clickkk");

    // alert("jdksajdkl")
    setBasicModal(!basicModal)

  }
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
  if (!departamentos) {
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
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">Server Side</CardTitle>
          <CardTitle tag="h4">
            <div id="TooltipExample">
              <Share className="icon-modal" size={30} onClick={handleOpenModal} />
            </div>
            <Tooltip
              isOpen={tooltipOpen}
              flip
              target="TooltipExample"
              toggle={() => { setTooltipOpen(!tooltipOpen) }}
            >
              {'Avance publicadas'}
            </Tooltip>
          </CardTitle>
        </CardHeader>
        <Row className="mb-1 justify-content-between gap-1 p-1">
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




          <Modal centered
            isOpen={basicModal} toggle={() => setBasicModal(!basicModal)}>
              <ModalHeader toggle={() => setBasicModal(!basicModal)}>Basic Modal</ModalHeader>
              <ModalBody>
                <Bar
                  options={config}
                  data={data}
                />
              </ModalBody>
              <ModalFooter>
                <Button color='primary' onClick={() => setBasicModal(!basicModal)}>
                  Accept
                </Button>
              </ModalFooter>
            </Modal>

    </>
  );
};

export default Home;
