import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "../../../helpers/axios-client";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#B11917",
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#B11917",
    color: "white",
    fontWeight: "bold",
    marginTop: "10px"
  },
}));

export default function ForgetPassword() {
  const classes = useStyles();
  const [notice, setNotice] = ("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = e.target.userId.value;
    const mobile = e.target.mobileNumber.value;

    if(userId.slice(0, 1)=== "6" || userId.slice(0, 1)==='X') {

        axios.get(`/Distributor/User/${userId}`).then((list) => {

            if(list.data[0].phone === mobile) {
                axios.post("/Distributor/forgotPassword", { userId, mobile })
                .then((data)=>{
                    console.log(data)
                })
                .catch((error)=> console.log(error));
            }
            else {
                setNotice("Mobile Number not compatible with UserId");
            }
            
        });
    }
    else if(userId.slice(0, 1)=== "BB") {
        
        axios.get(`/Bulkbreaker/User/${userId}`).then((list) => {

            if(list.data[0].phone === mobile) {
                axios.post("/Bulkbreaker/setPassword", { userId, mobile })
                .then((data)=>{
                    console.log(data)
                })
                .catch((error)=> console.log(error))
            }
            else {
                setNotice("Mobile Number not compatible with UserId");
            }
            
        });

    }
    else if(userId.value.slice(0, 1)=== "RT") {

        axios.get(`/Poc/User/${userId}`).then((list) => {

            if(list.data[0].phone === mobile) {
                axios.post("/Poc/setPassword", { userId, mobile })
                .then((data)=>{
                    console.log(data)
                })
                .catch((error)=> console.log(error))
            }
            else {
                setNotice("Mobile Number not compatible with UserId");
            }  
        });
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <span className={'text-danger text-center font-weight-bold'}>{notice}</span>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userId"
            label="User Id"
            name="userId"
            autoComplete="User Id"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="mobileNumber"
            label="Mobile Number"
            type="number"
            id="mobileNumber"
            autoComplete="Mobile Number"
          />
            <span className={'text-center mt-3'} style={{fontSize: "12px", color: "grey"}}>Make sure the mobile number you are submitting is the same as what you registered your User Id with.</span>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="#B11917"
            className={classes.submit}
          >
            Submit
          </Button>
          <Grid container>
            
            <Grid item style={{color: "#B11917", fontSize: "12px"}}>
                Do you wish to go back to login page? 
                <Link href="/" variant="body2" className={'pl-2 font-weight-bold text-info'}>
                {"Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
     
      </Box>
    </Container>
  );
}
