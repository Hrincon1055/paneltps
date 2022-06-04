/* eslint-disable semi */
/* eslint-disable comma-dangle */
import { Mail, Home } from "react-feather";

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
    id: "actas",
    title: "Actas",
    icon: <Mail size={20} />,
    navLink: "/actas",
  },
];
