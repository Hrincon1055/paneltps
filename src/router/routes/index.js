import { lazy } from "react";
// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template";
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
    path: "/actas",
    component: lazy(() => import("../../views/Actas")),
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
];

export { DefaultRoute, TemplateTitle, Routes };
