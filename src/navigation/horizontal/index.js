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
    id: "secondPage",
    title: "Second Page",
    icon: <Mail size={20} />,
    navLink: "/second-page",
  },
  {
    id: "departamentosCard",
    title: "departamentos Card",
    icon: <PieChart size={20} />,
    navLink: "/departamentos-card",
  },
];
