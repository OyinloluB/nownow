import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";

import ViewBasket from "./ViewBasket";
import StatusModal from "../Modals/StatusModal";
import Logo from "../../assets/logo3.png";
import Logo1 from "../../assets/logo4.jpg";

import { logout } from "../../redux/auth/auth.actions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    justifyContent: "space-between",
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  menuButton: {
    marginRight: theme.spacing(0),
  },
  appbar: {
    backgroundColor: "#B11917",
  },
  title: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const [viewBasket, setViewBasket] = useState(false);

  const {
    isAuthenticated,
    user,
    cartItemsCount,
    receivedOrdersCount,
  } = useSelector((state) => {
    const cartItems = [...state.cart.items];
    const itemOwners = new Set(cartItems.map(item => item.userID));
    return {
      isAuthenticated: state.auth.isAuthenticated,
      user: state.auth.user,
      cartItemsCount: itemOwners.size,
      receivedOrdersCount: state.order.receivedOrders.filter(
        (order) => order.status === "new"
      ).length,
    };
  });
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logout());
  };

  const classes = useStyles();
  return (
    <>
      <StatusModal open={open} setOpen={setOpen} callback={logOut} comingFrom='logout' />
      <ViewBasket show={viewBasket} setViewBasket={setViewBasket} />
      {isAuthenticated ? (
        <div className={classes.grow}>
          <AppBar position='fixed' style={{zIndex: 1}} className={classes.appbar}>
            <Toolbar className={classes.toolbar}>
              <Typography
                variant="h6"
                className={classes.title}
                style={{ display: "flex", alignItems: "center" }}
              >
                <img
                  src={Logo}
                  alt="ibplc-logo"
                  style={{ cursor: "pointer" }}
                  width="90"
                  onClick={() => history.push("/")}
                />
              {
                isAuthenticated ?
                (<img
                  src={Logo1}
                  alt="ibplc-logo"
                  style={{ cursor: "pointer" }}
                  width="100"
                  onClick={() => history.push("/")}
                  className={'d-none d-md-block'}
                  />) :
                (<img
                  src={Logo1}
                  alt="ibplc-logo"
                  style={{ cursor: "pointer" }}
                  width="90"
                  onClick={() => history.push("/")}
                />) 
              }
                <p
                  style={{
                    paddingLeft: "10px",
                    marginBottom: "0rem",
                    fontSize: "15px",
                  }}
                >
                  {user.name}
                </p>
              </Typography>
              <div style={{ display: "flex" }}>
                {user.type !== "distributor" ? (
                  <IconButton
                    aria-label="shopping"
                    color="inherit"
                    onClick={() => setViewBasket(true)}
                  >
                    <Badge badgeContent={cartItemsCount} color="secondary">
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                ) : null}
                <IconButton aria-label="delivery" color="inherit">
                  <Badge badgeContent={receivedOrdersCount} color="secondary">
                    <LocalShippingIcon onClick={() => history.push("/orders")} />
                  </Badge>
                </IconButton>
                <Button
                  color="inherit"
                  onClick={() => setOpen(true)}
                  className={"d-none d-md-block"}
                >
                  <IconButton
                    edge="end"
                    aria-label="chatting"
                    aria-haspopup="true"
                    color="inherit"
                    className={classes.menuButton}
                  >
                    <ExitToAppIcon />
                  </IconButton>
                  Logout
                </Button>
                <ExitToAppIcon
                  onClick={() => setOpen(true)}
                  className={"d-block d-md-none mt-2"}
                />
              </div>
            </Toolbar>
          </AppBar>
        </div>
      ) : (
        <div className={classes.root}>
          <AppBar position="static" className={classes.appbar}>
            <Toolbar className={classes.toolbar}>
              <Typography variant="h6" className={classes.title}>
                <img
                  src={Logo}
                  alt="ibplc-logo"
                  style={{ cursor: "pointer" }}
                  width="100"
                />
              </Typography>
              <Button color="inherit" onClick={() => history.push("/")}>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                >
                  <ExitToAppIcon />
                </IconButton>
                Login
              </Button>
            </Toolbar>
          </AppBar>
        </div>
      )}
    </>
  );
}
