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

const labels = ["publicadas", "faltantes"];
const data = {
  labels: labels,
  datasets: [
    {
      data: [65, 67],
      backgroundColor: ["rgb(255, 99, 132)", "rgb(255, 159, 64)"],
      borderColor: ["rgba(255, 99, 132, 0.2)", "rgba(255, 159, 64, 0.2)"],
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    yAxes: {
      title: {
        display: true,
        text: "Avance General Publicadas",
      },
    },
  },
  plugins: {
    datalabels: {
      backgroundColor: function (context) {
        return context.dataset.backgroundColor;
      },
      borderColor: "white",
      borderRadius: 25,
      borderWidth: 3,
      color: "white",
    },
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
};

// INICIO
const Home = () => {
  // HOOKS
  const history = useHistory();
  // STATE
  const [departamentos, setDepartamentos] = useState(null);
  const [totales, setTotales] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [basicModal, setBasicModal] = useState(false);

  // EFFECT
  useEffect(() => {
    axiosApi
      .get(PATHS_API.departamentos)
      .then((response) => {
        if (response.status == 200) {
          setTotales(response.data);
          setDepartamentos(response.data.departamentos);
        } else {
          console.log("Home LINE 112 =>", "Error difernte de 200");
        }
      })
      .catch((err) => {
        toast.error("Ha ocurrido un error");
        console.log("Home LINE 115 =>", err);
      });
  }, []);
  // FUNCIONES
  const handleClick = () => {
    history.push(`/municipios?zona=xxx`);
  };
  const handleOpenModal = () => {
    setBasicModal(!basicModal);
  };

  const filteredDepartamentos = () => {
    if (search.length === 0) {
      return departamentos.slice(currentPage, currentPage + 50);
    }
    const filterd = departamentos.filter((departamento) => {
      return departamento.descripcion
        .toLowerCase()
        .includes(search.toLowerCase());
    });
    return filterd.slice(currentPage, currentPage + 50);
  };
  // const nextPage = () => {
  //   if (
  //     departamentos.filter((departamento) =>
  //       departamento.departamento
  //         .toLowerCase()
  //         .includes(search.toLocaleLowerCase())
  //     ).length >
  //     currentPage + 5
  //   ) {
  //     setCurrentPage(currentPage + 5);
  //   }
  // };
  // const prevPage = () => {
  //   if (currentPage > 0) {
  //     setCurrentPage(currentPage - 5);
  //   }
  // };
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
              <Share
                className="icon-modal"
                size={30}
                onClick={handleOpenModal}
              />
            </div>
            <Tooltip
              isOpen={tooltipOpen}
              flip
              target="TooltipExample"
              toggle={() => {
                setTooltipOpen(!tooltipOpen);
              }}
            >
              {"Avance publicadas"}
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
                  <td>{departamento.descripcion.toUpperCase()}</td>
                  <td>{departamento.esperados}</td>
                  <td>{departamento.publicados}</td>
                  <td>
                    <span>{departamento.avance}%</span>
                    <Progress value={departamento.avance} />
                  </td>
                  <td>{departamento.sinPublicar}</td>
                  <td>{departamento.e11Certificados}</td>
                  <td>{departamento.faltantes}</td>
                </tr>
              ))}
            <tr>
              <td>TOTALES</td>
              <td>{totales.sumEsperados}</td>
              <td>{totales.sumPublicados}</td>
              <td>{totales.promAvance}</td>
              <td>{totales.sumSinPublicar}</td>
              <td>{totales.sumE11Certificados}</td>
              <td>{totales.sumfaltantes}</td>
            </tr>
          </tbody>
        </Table>
      </Card>
      {/* <div>
        <Button color="primary" className="m-1" onClick={prevPage}>
          Anterior
        </Button>
        <Button color="primary" onClick={nextPage}>
          Siguiente
        </Button>
      </div> */}

      <Modal
        centered
        isOpen={basicModal}
        toggle={() => setBasicModal(!basicModal)}
      >
        <ModalHeader toggle={() => setBasicModal(!basicModal)}>
          Basic Modal
        </ModalHeader>
        <ModalBody>
          <div style={{ height: "40vh", width: "100%", position: "relative" }}>
            <Bar options={options} data={data} />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setBasicModal(!basicModal)}>
            Accept
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Home;
