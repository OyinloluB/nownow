import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Switch from "@material-ui/core/Switch";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: 'green',
        borderColor: 'green',
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);


const PaymentModeOption = ({ checked, handleToggle }) => {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      <ListItem className={'d-flex'}>
        <ListItemText id="switch-list-label-cash" primary="Cash" />
          <Typography component="div">
            <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item style={{fontSize: '10px'}}>Off</Grid>
              <Grid item>
                <AntSwitch checked={checked.indexOf("cash") !== -1} onChange={handleToggle("cash")} name="cash" />
              </Grid>
              <Grid item style={{fontSize: '8px'}}>On</Grid>
            </Grid>
          </Typography>
        </ListItem>
        
      <ListItem>
        <ListItemText id="switch-list-label-pos" primary="POS" />
          <Typography component="div">
            <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item style={{fontSize: '8px'}}>Off</Grid>
              <Grid item>
                <AntSwitch checked={checked.indexOf("pos") !== -1} onChange={handleToggle("pos")} name="pos" />
              </Grid>
              <Grid item style={{fontSize: '10px'}}>On</Grid>
            </Grid>
          </Typography>
        
      </ListItem>
      <ListItem>
        <ListItemText id="switch-list-label-transfer" primary="Transfer" />
          <Typography component="div">
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item style={{fontSize: '10px'}}>Off</Grid>
                <Grid item>
                  <AntSwitch checked={checked.indexOf("transfer") !== -1} onChange={handleToggle("transfer")} name="transfer" />
                </Grid>
                <Grid item style={{fontSize: '10px'}}>On</Grid>
              </Grid>
            </Typography>
      </ListItem>
    </List>
  );
}

export default PaymentModeOption;
