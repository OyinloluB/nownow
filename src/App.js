import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import Eligible from "./Components/Modals/Eligible";
import Privacy from "./Components/Legal/Privacy";
import Terms from "./Components/Legal/Terms";
import Cookie from "./Components/General/Cookies";

import axios from "./helpers/axios-client";

import {
  fetchBulkBreakers,
  fetchPocs,
  fetchDistributors,
} from "./redux/user/user.actions";

import { fetchReceivedOrders } from "./redux/order/order.actions";

import Navbar from "./Components/Layout/Navbar";
import Home from "./Components/General/Home";
// import OrderDetails from "./Components/General/OrderDetails";
import Order from "./Components/General/Order";

import UserInfo from "./Components/AccountForms/User/UserInfo";
import UserSignIn from "./Components/AccountForms/User/UserSignIn";

import { ProtectedRoute } from "./helpers/routes";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #b11917",
    borderRadius: "5px",
  },
  paper: {
    backgroundColor: "#b11917",
    border: "1px solid white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "5px",
  },
}));

function App() {
  const { user, isAuthenticated, eligible } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [colorYes, setColorYes] = useState("green");
  const [colorNo, setColorNo] = useState("#B11917");

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchReceivedOrders());
      if (user.type === "poc") {
        dispatch(fetchBulkBreakers());
        dispatch(fetchDistributors());

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
        dispatch(fetchReceivedOrders());

        axios.get(`/BulkBreaker/User/${user.userID}`).then((list) => {
          list.data[0].confirmed === true ? setOpen(false) : setOpen(true);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const handleYes = () => {
    setColorYes("#B11917");
    if (user.type === "distributor") {
      axios
        .patch(`/Distributor/${user.id}`, { confirmed: true })
        .then((list) => {
          setOpen(false);
        });
    } else if (user.type === "bulkbreaker") {
      axios
        .patch(`/BulkBreaker/${user.id}`, { confirmed: true })
        .then((list) => {
          setOpen(false);
        });
    } else if (user.type === "poc") {
      axios.patch(`/Poc/${user.id}`, { confirmed: true }).then((list) => {
        setOpen(false);
      });
    }
  };

  const handleNo = () => {
    setColorNo("green");
    if (user.type === "distributor") {
      axios
        .patch(`/Distributor/${user.id}`, { confirmed: false })
        .then((list) => {
          setOpen(false);
        });
    } else if (user.type === "bulkbreaker") {
      axios
        .patch(`/BulkBreaker/${user.id}`, { confirmed: false })
        .then((list) => {
          setOpen(false);
        });
    } else if (user.type === "poc") {
      axios.patch(`/Poc/${user.id}`, { confirmed: false }).then((list) => {
        setOpen(false);
      });
    }
  };

  return (
    <>
      <Navbar />

      {/* promp to set your store open/close */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 5000,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div
              className={"text-light text-center"}
              style={{ fontSize: "15px", wordBreak: "nowrap" }}
            >
              Welcome, Do you want customers to see your store open?
            </div>
            <div className={"row mt-4"}>
              <div className={"container offset-1 offset-md-2"}>
                <button
                  className={"btn pr-4 pl-4 ml-md-1"}
                  style={{
                    color: "white",
                    border: "1px solid green",
                    backgroundColor: colorYes,
                  }}
                  onClick={handleYes}
                >
                  Yes, I do!
                </button>
                <button
                  className={"btn offset-1"}
                  style={{
                    color: "white",
                    border: "1px solid white",
                    backgroundColor: colorNo,
                  }}
                  onClick={handleNo}
                >
                  No, I don't!
                </button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
      <Cookie />
      {isAuthenticated ? null : <Eligible />}
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
        <Route exact path="/signin" component={UserSignIn} />
      </Switch>
    </>
  );
}

export default App;
