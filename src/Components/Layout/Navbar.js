import React, { useState, Fragment } from "react";
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
import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';
import Logo from "../../assets/logo.png";
import { Signupas } from "../Modals/Signupas";

import { useHistory, useLocation } from "react-router-dom";



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
  title: {
    flexGrow: 1,
  },
  appbar: {
    backgroundColor: "#b11917",
    boxShadow: "5px 10px 8px 10px #888888",
  },
  title: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));

export default function Navbar({user}) {
  
  
  console.log(user)
  const [showPrompt, setShowPrompt] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const history = useHistory();
  let location = useLocation();

  const handleModalPrompt = () => {
    setShowPrompt(true);
  };
  
  
  // handling routing into order page
  const handleOrderRout=()=>{
    history.push('/orders');
  }

  const backFunc = () => {
    history.push('/');
  }
  
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
              {location.pathname=='/orders' ? (<React.Fragment className="row"><ArrowBackSharpIcon onClick={ backFunc }  style={{border: '1px solid white', cursor: 'pointer'}} /><div className='p-2 text-justify offset-1'>All Orders</div></React.Fragment>):(<div></div>)}
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <IconButton aria-label="shopping" color="inherit">
                  <Badge badgeContent={0} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <IconButton onClick={ handleOrderRout }  aria-label="delivery" color="inherit">
                  <Badge badgeContent={3} color="secondary">
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
