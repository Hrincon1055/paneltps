import { Card, CardHeader, CardBody, CardTitle, CardText } from "reactstrap";
import ReactPaginate from "react-paginate";

import ChartDataLabels from "chartjs-plugin-datalabels";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  ChartDataLabels,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SecondPage = () => {
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

  return (
    <>
      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        pageCount={10}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        containerClassName="pagination"
        activeClassName="active"
      />

      <Card>
        <CardHeader>
          <CardTitle>Create Awesome ????</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>This is your second page prueba</CardText>
          <CardText>
            Chocolate sesame snaps pie carrot cake pastry pie lollipop muffin.
            Carrot cake drag??e chupa chups jujubes. Macaroon liquorice cookie
            wafer tart marzipan bonbon. Gingerbread jelly-o drag??e chocolate.
          </CardText>
        </CardBody>
      </Card>

      <div style={{ height: "40vh", width: "100%", position: "relative" }}>
        <Bar options={options} data={data} />
      </div>
    </>
  );
};

export default SecondPage;
