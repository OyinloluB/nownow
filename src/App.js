import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Eligible from "./Components/Modals/Eligible";
import Privacy from "./Components/Legal/Privacy";
import Terms from "./Components/Legal/Terms";

import {
  fetchBulkBreakers,
  fetchPocs,
  fetchDistributors,
} from "./redux/user/user.actions";

import {
  fetchReceivedOrders,
  fetchSentOrders,
} from "./redux/order/order.actions";

import Navbar from "./Components/Layout/Navbar";
import Home from "./Components/General/Home";
// import OrderDetails from "./Components/General/OrderDetails";
import Order from "./Components/General/Order";

import UserInfo from "./Components/AccountForms/User/UserInfo";
import UserSignIn from "./Components/AccountForms/User/UserSignIn";

import { ProtectedRoute } from "./routes";

function App() {
  const { user, isAuthenticated, eligible } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      if (user.type === "poc") {
        dispatch(fetchBulkBreakers());
        dispatch(fetchDistributors());
        dispatch(fetchReceivedOrders());
        dispatch(fetchSentOrders());
      } else if (user.type === "distributor") {
        dispatch(fetchPocs());
        dispatch(fetchBulkBreakers());
        dispatch(fetchReceivedOrders());
      } else if (user.type === "bulkbreaker") {
        dispatch(fetchPocs());
        dispatch(fetchDistributors());
        dispatch(fetchReceivedOrders());
        dispatch(fetchSentOrders());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const userTypes = ["poc", "distributor", "bulkbreaker"];

  return (
    <>
      <Navbar type={user.type}/>
      {/* {isAuthenticated ? null : <Eligible />} */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/terms" component={Terms} />
        <Route exact path="/privacy" component={Privacy} />
        <ProtectedRoute
          exact
          path="/orders"
          isAuthenticated={isAuthenticated}
          component={Order}
        />
        {/*<ProtectedRoute
          exact
          path="/orderdetail"
          isAuthenticated={isAuthenticated}
          component={OrderDetails}
        /> */}
        <Route
          exact
          path="/:user/info"
          render={({ match: { params } }) =>
            isAuthenticated ? (
              userTypes.includes(params.user) ? (
                <UserInfo type={params.user} />
              ) : (
                <Redirect to="/" />
              )
            ) : (
              <Redirect
                to={
                  userTypes.includes(params.user)
                    ? `/${params.type}/signin`
                    : "/"
                }
              />
            )
          }
        />
        />
        <Route
          exact
          path="/:user/signin"
          render={({ match: { params } }) =>
            userTypes.includes(params.user) ? (
              <UserSignIn type={params.user} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
      </Switch>
    </>
  );
}

export default App;
