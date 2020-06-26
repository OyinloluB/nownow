import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Eligible from "./Components/Agegate";
import Privacy from "./Components/Legal/Privacy";
import Terms from "./Components/Legal/Terms";
import ReturnPolicy from "./Components/Legal/ReturnPolicy";
import Cookie from "./Components/General/Cookies";
import Navbar from "./Components/Layout/Navbar";
import Home from "./Components/General/Home";
import Order from "./Components/General/Order";
import UserInfo from "./Components/AccountForms/User/UserInfo";
import ForgetPassword from "./Components/AccountForms/User/ForgetPassword";
import UserSignIn from "./Components/AccountForms/User/UserSignIn";
import StatusModal from "./Components/Modals/StatusModal";
import DeliveryCard from "./Components/Modals/DeliveryCard";
import Footer from "./Components/Layout/Footer";

import {
  fetchBulkBreakers,
  fetchPocs,
  fetchDistributors,
} from "./redux/user/user.actions";
import { fetchReceivedOrders, fetchSentOrders } from "./redux/order/order.actions";

import axios from "./helpers/axios-client";
import { ProtectedRoute } from "./helpers/routes";
import UserGuide from "./Components/Carosel/UserGuide";

function App() {
  const { user, isAuthenticated, eligible, deliveredOrders } = useSelector(
    (state) => ({
      user: state.auth.user,
      isAuthenticated: state.auth.isAuthenticated,
      eligible: state.auth.eligible,
      deliveredOrders: state.order.sentOrders.filter(
        (order) => order.status === "delivered"
      ),
    })
  );
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [ readUserGuide, setReadUserGuide ] = useState(true);

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
      <Navbar />
      {/* promp to set your store open/close */}
      <StatusModal open={open} setOpen={setOpen} comingFrom="login" />
      { isAuthenticated? 
      <div style={{ position: 'absolute', zIndex: 1 }} className={ readUserGuide? 'd-block offset-1 offset-md-4':'d-none'}>
        <UserGuide setReadUserGuide={setReadUserGuide} userType={user.type} />
      </div>
      : null}
      <Cookie />
      {!eligible ? <Eligible /> : null}
      {deliveredOrders.map((order) => {
        return <DeliveryCard key={order._id} order={order} />;
      })}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/terms" component={Terms} />
        <Route exact path="/return" component={ReturnPolicy} />
        <Route exact path="/privacy" component={Privacy} />
        <Route exact path="/forgetPassword" component={ForgetPassword} />
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
      <Footer />
    </>
  );
}

export default App;
