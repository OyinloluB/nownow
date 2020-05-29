import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function NestedList() {
  const classes = useStyles();
  const [openSignup, setOpenSignup] = React.useState(true);
  const [openSignin, setOpenSignin] = React.useState(false);

  const handleClickSignin = () => {
    setOpenSignin(!openSignin);
  };
  const handleClickSignup = () => {
    setOpenSignup(!openSignup);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      {/* Sign Up Prompt */}

      <ListItem button onClick={handleClickSignup}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Sign up" />
        {openSignup ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openSignup} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Distributor" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Bulb Breaker" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="POC" />
          </ListItem>
        </List>
      </Collapse>

      {/* Sign In Prompt */}

      <ListItem button onClick={handleClickSignin}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Sign in" />
        {openSignin ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openSignin} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Distributor" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Bulb Breaker" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="POC" />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}
