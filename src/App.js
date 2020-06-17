import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Eligible from "./Components/Agegate";
import Privacy from "./Components/Legal/Privacy";
import Terms from "./Components/Legal/Terms";
import Cookie from "./Components/General/Cookies";
import Navbar from "./Components/Layout/Navbar";
import Home from "./Components/General/Home";
import Order from "./Components/General/Order";
import UserInfo from "./Components/AccountForms/User/UserInfo";
import UserSignIn from "./Components/AccountForms/User/UserSignIn";
import StatusModal from "./Components/Modals/StatusModal";
import ConfirmDelivery from "./Components/Modals/ConfirmDelivery";

import {
  fetchBulkBreakers,
  fetchPocs,
  fetchDistributors,
} from "./redux/user/user.actions";
import { fetchReceivedOrders, fetchSentOrders } from "./redux/order/order.actions";

import axios from "./helpers/axios-client";
import { ProtectedRoute } from "./helpers/routes";

function App() {
  const { user, isAuthenticated, eligible } = useSelector((state) => ({
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    eligible: state.auth.eligible,
  }));
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchReceivedOrders());
      if (user.type === "poc") {
        dispatch(fetchBulkBreakers());
        dispatch(fetchDistributors());
        dispatch(fetchSentOrders());

        axios.get(`/Poc/User/${user.userID}`).then((list) => {
          list.data[0].confirmed === true ? setOpen(false) : setOpen(true);
        });
      } else if (user.type === "distributor") {
        dispatch(fetchPocs());
        dispatch(fetchBulkBreakers());

        axios.get(`/Distributor/User/${user.userID}`).then((list) => {
          list.data[0].confirmed === true ? setOpen(false) : setOpen(true);
        });
      } else if (user.type === "bulkbreaker") {
        dispatch(fetchPocs());
        dispatch(fetchDistributors());
        dispatch(fetchSentOrders());

        axios.get(`/BulkBreaker/User/${user.userID}`).then((list) => {
          list.data[0].confirmed === true ? setOpen(false) : setOpen(true);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <>
      <Navbar showDeliveryModal={() => setShowDeliveryModal(true)} />
      {/* promp to set your store open/close */}
      <StatusModal open={open} setOpen={setOpen} comingFrom='login' />
      <Cookie />
      {!eligible ? <Eligible /> : null}
      <ConfirmDelivery show={showDeliveryModal} setShow={setShowDeliveryModal} />
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
        <ProtectedRoute
          exact
          path="/info"
          isAuthenticated={isAuthenticated}
          component={UserInfo}
        />
        <Route exact path="/signin" component={UserSignIn} />
      </Switch>
    </>
  );
}

export default App;
