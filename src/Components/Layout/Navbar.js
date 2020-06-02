import React, { useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Badge from "@material-ui/core/Badge";
import ChatIcon from "@material-ui/icons/Chat";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import Logo from "../../assets/logo.png";
import { Signupas } from "../Modals/Signupas";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    justifyContent: "space-between",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuButton: {
    marginRight: theme.spacing(0),
  },
  title: {
    flexGrow: 1,
  },
  appbar: {
    backgroundColor: "#b11917",
    borderRadius: "10px",
    boxShadow: "5px 10px 8px 10px #888888"
  },
  title: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));

export default function Navbar() {
  const [showPrompt, setShowPrompt] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const handleModalPrompt = () => {
    setShowPrompt(true);
  };

  const classes = useStyles();

  return (
    <>
      {isAuthenticated ? (
        <div className={classes.grow}>
          <AppBar position="static" className={classes.appbar}>
            <Toolbar className={classes.toolbar}>
              <Typography variant="h6" className={classes.title}>
                <img src={Logo} alt="ibplc-logo" width="30" />
              </Typography>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <IconButton aria-label="shopping" color="inherit">
                  <Badge badgeContent={0} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <IconButton aria-label="delivery" color="inherit">
                  <Badge badgeContent={0} color="secondary">
                    <LocalShippingIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="chatting"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <Badge badgeContent={0} color="secondary">
                    <ChatIcon />
                  </Badge>
                </IconButton>
              </div>
              {/* <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </div> */}
            </Toolbar>
          </AppBar>
        </div>
      ) : (
        <div className={classes.root}>
          <AppBar position="static" className={classes.appbar}>
            <Toolbar className={classes.toolbar}>
              <Typography variant="h6" className={classes.title}>
                <img src={Logo} alt="ibplc-logo" width="30" />
              </Typography>
              <Button color="inherit" onClick={handleModalPrompt}>
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
          {showPrompt ? (
            <Signupas show={showPrompt} setShowPrompt={setShowPrompt} />
          ) : null}
        </div>
      )}
    </>
  );
}
