import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Signupas } from "../Modals/Signupas";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(0),
  },
  title: {
    flexGrow: 1,
  },
  appbar: {
    backgroundColor: "#b11917",
  },
}));

export default function Navbar() {
  const [showPrompt, setShowPrompt] = useState(false);
  const handleModalPrompt = () => {
    setShowPrompt(true);
  };

  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static" className={classes.appbar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Logo
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
    </>
  );
}
