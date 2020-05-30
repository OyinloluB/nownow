import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function PaymentModeOption() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(["cash"]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List className={classes.root}>
      <ListItem>
        <ListItemText id="switch-list-label-cash" primary="Cash" />
        <ListItemSecondaryAction>
          <Switch
            edge="end"
            onChange={handleToggle("cash")}
            checked={checked.indexOf("cash") !== -1}
            inputProps={{ "aria-labelledby": "switch-list-label-cash" }}
          />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemText id="switch-list-label-pos" primary="POS" />
        <ListItemSecondaryAction>
          <Switch
            edge="end"
            onChange={handleToggle("pos")}
            checked={checked.indexOf("pos") !== -1}
            inputProps={{ "aria-labelledby": "switch-list-label-pos" }}
          />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemText id="switch-list-label-transfer" primary="Transfer" />
        <ListItemSecondaryAction>
          <Switch
            edge="end"
            onChange={handleToggle("transfer")}
            checked={checked.indexOf("transfer") !== -1}
            inputProps={{ "aria-labelledby": "switch-list-label-transfer" }}
          />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}
