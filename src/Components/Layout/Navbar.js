import React, { useState } from "react";
import { useSelector } from "react-redux";
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

import { ViewBasket } from "./ViewBasket";
import axios from "../../helpers/axios-client";
import Logo from "../../assets/logo3.png";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


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

  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #b11917',
    borderRadius: '5px'
  },
  paper: {
    backgroundColor: "#b11917",
    border: '1px solid white',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: '5px', 
  },
}));

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const [viewBasket, setViewBasket] = useState(false);
  const [ yesColor, setYesColor ] = useState('green');
  const [ noColor, setNoColor ] = useState('#B11917');

  const { isAuthenticated, user, cartItemsCount, receivedOrdersCount } = useSelector(
    (state) => {
      return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user,
        cartItemsCount: state.cart.items.length,
        receivedOrdersCount: state.order.receivedOrders.filter(
          (order) => order.status === "new"
        ).length,
      };
    }
  );

  const logOut = () => {
    setOpen(true);
  };

  const handleYes = () => {
    setYesColor('#B11917');
    if (user.type === "distributor") {
      axios
        .patch(`/Distributor/${user.id}`, { confirmed: true })
        .then((list) => {setOpen(false);localStorage.clear(); window.location.reload();});
    } else if (user.type === "bulkbreaker") {
      axios
        .patch(`/BulkBreaker/${user.id}`, { confirmed: true })
        .then((list) => {setOpen(false);localStorage.clear(); window.location.reload();});
    } else if (user.type === "poc") {
      axios.patch(`/Poc/${user.id}`, { confirmed: true })
      .then((list) => {setOpen(false);localStorage.clear(); window.location.reload();});
    }
  } 
  
  const handleNo = () => {
    setNoColor('green');
    if (user.type === "distributor") {
      axios
        .patch(`/Distributor/${user.id}`, { confirmed: false })
        .then((list) => {setOpen(false);localStorage.clear(); window.location.reload();});
    } else if (user.type === "bulkbreaker") {
      axios
        .patch(`/BulkBreaker/${user.id}`, { confirmed: false })
        .then((list) => {setOpen(false);localStorage.clear(); window.location.reload();});
    } else if (user.type === "poc") {
      axios.patch(`/Poc/${user.id}`, { confirmed: false })
      .then((list) => {setOpen(false);localStorage.clear(); window.location.reload();});
    }
  }

  const classes = useStyles();
  return (
    <>

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
        <div className={'text-light text-center'} style={{fontSize: '15px', wordBreak: 'nowrap'}}>Do you want customers to still see your store open after log-out?</div>
            <div className={'row mt-4'}>
              <div className={'container offset-1 offset-md-2'}>
                <button className={'btn pr-4 pl-4 ml-md-3'} style={{color: 'white', border: '1px solid green', backgroundColor: yesColor }} onClick={handleYes}>Yes, I do!</button>
                <button className={'btn offset-1'} style={{color: 'white', border: '1px solid white', backgroundColor: noColor }} onClick={handleNo}>No, I don't!</button>
              </div>
            </div>
            
          </div>
        </Fade>
      </Modal>
      
      <ViewBasket show={viewBasket} setViewBasket={setViewBasket} />
      {isAuthenticated ? (
        <div className={classes.grow}>
          <AppBar position="static" className={classes.appbar}>
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
                  width="100"
                  onClick={() => history.push("/")}
                />
                <p
                  style={{
                    paddingLeft: "10px",
                    // whiteSpace: "nowrap",
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
                    <LocalShippingIcon
                      onClick={() => history.push("/orders")}
                    />
                  </Badge>
                </IconButton>
                <Button color="inherit" onClick={logOut} className={'d-none d-md-block'}>
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
                <ExitToAppIcon onClick={logOut} className={'d-block d-md-none mt-2'}/>
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
              <Button color="inherit" onClick={() => history.push("/signin")}>
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
