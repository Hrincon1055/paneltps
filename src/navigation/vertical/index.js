/* eslint-disable semi */
/* eslint-disable comma-dangle */
import { Mail, Home, PieChart } from "react-feather";

export default [
  {
    id: "home",
    title: "Home",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "departamentosCard",
    title: "home card",
    icon: <PieChart size={20} />,
    navLink: "/departamentos-card",
  },
  {
    id: "secondPage",
    title: "Pruebas",
    icon: <Mail size={20} />,
    navLink: "/second-page",
  },
];
