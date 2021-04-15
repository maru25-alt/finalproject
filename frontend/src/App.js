import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./scss/style.scss";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import { selectUser } from "./store/slices/userSlice";
import { selectShowLoading } from "./store/slices/appSlice";
import { SignedOutRoutes, SignedInRoutes } from "./ProtectedRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Containers
const TheLayout = React.lazy(() => import("./layouts/index"));
//const Layout = React.lazy(() => import('./containers/Layout/Layout'));

// Pages
const Login = React.lazy(() => import("./pages/login/Login"));
const ForgetPassword = React.lazy(() =>
  import("./pages/forget/ForgetPassword")
);
const Reset = React.lazy(() => import("./pages/reset/Reset"));
const Page404 = React.lazy(() => import("./pages/page404/Page404"));
const Page500 = React.lazy(() => import("./pages/page500/Page500"));

function App() {
  const user = useSelector(selectUser);
  const loading = useSelector(selectShowLoading);

  return (
    <div className="app">
      {loading && <Loading />}
      <Router>
        <ToastContainer />
        <React.Suspense fallback={<Loading />}>
          <Switch>
            <SignedOutRoutes
              isAuth={user}
              exact={true}
              path="/login"
              name="Login Page"
              component={Login}
            />
            <SignedOutRoutes
              isAuth={user}
              exact={true}
              path="/password/forget"
              name="Forget Password Page"
              component={ForgetPassword}
            />
            <SignedOutRoutes
              isAuth={user}
              exact={true}
              path="/password/reset"
              name="Reset Password Page"
              component={Reset}
            />
            <Route
              path="/500"
              exact
              name="Page 500"
              render={(props) => <Page500 {...props} />}
            />
            <Route
              path="/404"
              exact={true}
              name="Page 404"
              render={(props) => <Page404 {...props} />}
            />
            <SignedInRoutes
              isAuth={user}
              path="/"
              name="Home"
              Component={TheLayout}
            />
          </Switch>
        </React.Suspense>
      </Router>
    </div>
  );
}

export default App;
