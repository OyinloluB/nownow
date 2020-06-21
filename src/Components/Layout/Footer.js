import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Logo1 from "../../assets/logo5.jpg";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  text: {
    // padding: theme.spacing(1, 1, 0),
    color: '#fff',
    fontSize: '13px'
  },
 
  appBar: {
    top: 'auto',
    bottom: 0,
    color: '#fff',
    backgroundColor: "#B11917"
  },
  grow: {
    flexGrow: 1,
  },
  
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={'d-flex'}>
        <img
            src={Logo1}
            alt="ibplc-logo"
            style={{ cursor: "not-allowed", borderRadius: '3px', whiteSpace: 'nowrap' }}
            height="40"
            className={'d-none d-md-block'}
        />
        <span
            style={{
                fontSize: '11px'
            }}
            className={
                'offset-md-2'
            }>  
            
            &#9400;{ new Date().getFullYear() } IBPlc.
        </span> 
        <span 
        className={
            'ml-auto'
        }>
            <Link to="/terms" className={classes.text}>Terms of Use, </Link>
            <Link to="/return" className={classes.text}>Return Policy </Link>
            & <Link to="privacy" className={classes.text}>Privacy Policy</Link>
            </span>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
