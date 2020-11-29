import React, { lazy, Suspense } from "react";
import { Route, Switch, Link } from "react-router-dom";
import _merge from "lodash/merge";

import { Button } from "@material-ui/core";

import CustomBrowserRouter from "./utils/CustomBrowserRouter";
import PrivateRoute from "./utils/PrivateRoute";
import Snack from "./components/Snack";
import ErrorBoundary from "./components/ErrorBoundary";
import EmptyState from "./components/EmptyState";
import Loading from "./components/Loading";

import { SnackProvider } from "./utils/SnackProvider";
import ConfirmationProvider from "components/ConfirmationDialog/Provider";
import { AppProvider } from "contexts/AppContext";
import { FiretableContextProvider } from "contexts/FiretableContext";
import routes from "constants/routes";
import PerformanceProvider from 'components/Performance/Provider'
import AuthView from "pages/Auth/GoogleAuth";
import SignOutView from "pages/Auth/SignOut";

const HomePage = lazy(
  () => import("./pages/Home" /* webpackChunkName: "HomePage" */)
);
const TablePage = lazy(
  () => import("./pages/Table" /* webpackChunkName: "TablePage" */)
);
const ImpersonatorAuthPage = lazy(
  () =>
    import(
      "./pages/Auth/ImpersonatorAuth" /* webpackChunkName: "ImpersonatorAuthPage" */
    )
);
const JwtAuthPage = lazy(
  () => import("./pages/Auth/JwtAuth" /* webpackChunkName: "JwtAuthPage" */)
);
// const GridView = lazy(
//   () => import("./views/GridView" /* webpackChunkName: "GridView" */)
// );

export default function App() {
  return (
    <>
      <ErrorBoundary>
        <PerformanceProvider>
        <AppProvider>
          <ConfirmationProvider>
            <SnackProvider>
              <CustomBrowserRouter>
                <Suspense fallback={<Loading fullScreen />}>
                  <Switch>
                    <Route
                      exact
                      path={routes.auth}
                      render={() => <AuthView />}
                    />
                    <Route
                      exact
                      path={routes.impersonatorAuth}
                      render={() => <ImpersonatorAuthPage />}
                    />
                    <Route
                      exact
                      path={routes.jwtAuth}
                      render={() => <JwtAuthPage />}
                    />
                    <Route
                      exact
                      path={routes.signOut}
                      render={() => <SignOutView />}
                    />

                    <PrivateRoute
                      exact
                      path={[
                        routes.home,
                        routes.tableWithId,
                        routes.tableGroupWithId,
                        routes.gridWithId,
                      ]}
                      render={() => (
                        <FiretableContextProvider>
                          <Switch>
                            <PrivateRoute
                              exact
                              path={routes.home}
                              render={() => <HomePage />}
                            />
                            <PrivateRoute
                              path={routes.tableWithId}
                              render={() => <TablePage />}
                            />
                            <PrivateRoute
                              path={routes.tableGroupWithId}
                              render={() => <TablePage />}
                            />
                          </Switch>
                        </FiretableContextProvider>
                      )}
                    />

                    <PrivateRoute
                      render={() => (
                        <EmptyState
                          message="Page Not Found"
                          description={
                            <Button
                              component={Link}
                              to={routes.home}
                              variant="outlined"
                              style={{ marginTop: 8 }}
                            >
                              Go Home
                            </Button>
                          }
                          fullScreen
                        />
                      )}
                    />
                  </Switch>
                </Suspense>
                <Snack />
              </CustomBrowserRouter>
            </SnackProvider>
          </ConfirmationProvider>
        </AppProvider>
        </PerformanceProvider>
      </ErrorBoundary>
    </>
  );
}
