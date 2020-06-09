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

import { fetchReceivedOrders, fetchSentOrders } from "./redux/order/order.actions";

import Navbar from "./Components/Layout/Navbar";
import Home from "./Components/General/Home";
// import OrderDetails from "./Components/General/OrderDetails";
import Order from "./Components/General/Order";

import UserInfo from "./Components/AccountForms/User/UserInfo";
import UserSignIn from "./Components/AccountForms/User/UserSignIn";

import { ProtectedRoute } from "./routes";

function App() {
  const { user, isAuthenticated, eligible } = useSelector((state) => state.auth);
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

  return (
    <>
      <Navbar />
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
        <ProtectedRoute
          exact
          path="/info"
          isAuthenticated={isAuthenticated}
          component={UserInfo}
        />
        />
        <Route exact path="/signin" component={UserSignIn} />
      </Switch>
    </>
  );
}

export default App;
