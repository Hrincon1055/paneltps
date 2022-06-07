// ** React Imports
import { Suspense, lazy, Fragment } from "react";
// ** Utils
import { useLayout } from "@hooks/useLayout";
import { useRouterTransition } from "@hooks/useRouterTransition";
// ** Custom Components
import LayoutWrapper from "@layouts/components/layout-wrapper";
// ** Router Components
import {
  BrowserRouter as AppRouter,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
// ** Routes & Default Routes
import { DefaultRoute, Routes } from "./routes";
// ** Layouts
import BlankLayout from "@layouts/BlankLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import HorizontalLayout from "@src/layouts/HorizontalLayout";
const Router = () => {
  // ** Hooks
  const { layout, setLayout, setLastLayout } = useLayout();
  const { transition, setTransition } = useRouterTransition();
  // ** Default Layout
  const DefaultLayout =
    layout === "horizontal" ? "HorizontalLayout" : "VerticalLayout";
  // ** All of the available layouts
  const Layouts = { BlankLayout, VerticalLayout, HorizontalLayout };
  // ** Current Active Item
  const currentActiveItem = null;
  // ** Return Filtered Array of Routes & Paths
  const LayoutRoutesAndPaths = (layout) => {
    const LayoutRoutes = [];
    const LayoutPaths = [];
    if (Routes) {
      Routes.filter((route) => {
        if (
          route.layout === layout ||
          (route.layout === undefined && DefaultLayout === layout)
        ) {
          LayoutRoutes.push(route);
          LayoutPaths.push(route.path);
        }
      });
    }
    return { LayoutRoutes, LayoutPaths };
  };

  const NotAuthorized = lazy(() => import("@src/views/NotAuthorized"));
  // ** Init Error Component
  const Error = lazy(() => import("@src/views/Error"));
  // ** Return Route to Render
  const ResolveRoutes = () => {
    return Object.keys(Layouts).map((layout, index) => {
      // ** Convert Layout parameter to Layout Component
      // ? Note: make sure to keep layout and component name equal
      const LayoutTag = Layouts[layout];
      // ** Get Routes and Paths of the Layout
      const { LayoutRoutes, LayoutPaths } = LayoutRoutesAndPaths(layout);
      const routerProps = {};
      return (
        <Route path={LayoutPaths} key={index}>
          <LayoutTag
            layout={layout}
            setLayout={setLayout}
            transition={transition}
            routerProps={routerProps}
            setLastLayout={setLastLayout}
            setTransition={setTransition}
            currentActiveItem={currentActiveItem}
          >
            <Switch>
              {LayoutRoutes.map((route) => {
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    exact={route.exact === true}
                    render={(props) => {
                      // ** Assign props to routerProps
                      Object.assign(routerProps, {
                        ...props,
                        meta: route.meta,
                      });
                      return (
                        <Fragment>
                          {route.layout === "BlankLayout" ? (
                            <Fragment>
                              <route.component {...props} />
                            </Fragment>
                          ) : (
                            <LayoutWrapper
                              layout={DefaultLayout}
                              transition={transition}
                              setTransition={setTransition}
                              {...(route.appLayout
                                ? {
                                    appLayout: route.appLayout,
                                  }
                                : {})}
                              {...(route.meta
                                ? {
                                    routeMeta: route.meta,
                                  }
                                : {})}
                              {...(route.className
                                ? {
                                    wrapperClass: route.className,
                                  }
                                : {})}
                            >
                              <Suspense fallback={null}>
                                <route.component {...props} />
                              </Suspense>
                            </LayoutWrapper>
                          )}
                        </Fragment>
                      );
                    }}
                  />
                );
              })}
            </Switch>
          </LayoutTag>
        </Route>
      );
    });
  };

  return (
    <AppRouter basename={process.env.REACT_APP_BASENAME}>
      <Switch>
        {/* If user is logged in Redirect user to DefaultRoute else to login */}
        <Route
          exact
          path="/"
          render={() => {
            return <Redirect to={DefaultRoute} />;
          }}
        />
        {/* Not Auth Route */}
        <Route
          exact
          path="/misc/not-authorized"
          render={() => (
            <Layouts.BlankLayout>
              <NotAuthorized />
            </Layouts.BlankLayout>
          )}
        />
        {ResolveRoutes()}
        {/* NotFound Error page */}
        <Route path="*" component={Error} />
      </Switch>
    </AppRouter>
  );
};

export default Router;
