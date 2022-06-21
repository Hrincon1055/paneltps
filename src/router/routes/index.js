import { lazy } from "react";
// ** Document title
const TemplateTitle = "Panel E11";
// ** Default Route
const DefaultRoute = "/home";
// ** Merge Routes
const Routes = [
  {
    path: "/home",
    component: lazy(() => import("../../views/Home")),
  },
  {
    path: "/second-page",
    component: lazy(() => import("../../views/SecondPage")),
  },
  {
    path: "/municipios",
    component: lazy(() => import("../../views/Municipios")),
  },
  {
    path: "/ciudades",
    component: lazy(() => import("../../views/Ciudades")),
  },
  {
    path: "/departamentos-card",
    component: lazy(() => import("../../views/DepartamentosCard")),
  },
  {
    path: "/ciudades-card",
    component: lazy(() => import("../../views/CiudadesCard")),
  },
  {
    path: "/login",
    component: lazy(() => import("../../views/Login")),
    layout: "BlankLayout",
    meta: {
      authRoute: true,
    },
  },
  {
    path: "/error",
    component: lazy(() => import("../../views/Error")),
    layout: "BlankLayout",
  },
  {
    path: "/prueba",
    component: lazy(() => import("../../views/Pruebas")),
  },
];

export { DefaultRoute, TemplateTitle, Routes };
