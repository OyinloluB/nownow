import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import Container from "@material-ui/core/Container";
import PersonIcon from "@material-ui/icons/Person";
import LockIcon from "@material-ui/icons/Lock";

import ResetPassword from "../Prompts/ResetPassword";
import './login.css'

import axios from "../../../helpers/axios-client";
import {
  authenticateDistributor,
  authenticateBulkBreaker,
  authenticatePoc,
} from "../../../redux/auth/auth.actions";

import { checkDistributor } from "../../../redux/user/user.actions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const UserSignIn = () => {
  const classes = useStyles();
  const [type, setType] = useState("");
  const [loginDetails, setLoginDetails] = useState({ ID: "", password: "" });
  const [showUserId, setShowUserId] = useState("d-block");
  const [showUserPas, setShowUserPas] = useState("d-none");
  const [resetPassword, setResetPassword] = useState("d-none");
  const [userPassword, setUserPassword] = useState({});
  const [_id, _setId] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const [notice, setNotice] = useState("");

  const [showPrompt, setShowPrompt] = useState(true);

  const toggler = () => {
    const ID = loginDetails.ID;
    const password = "DDLCPD";
    console.log('nawa');

    if (ID.slice(0, 1) === "6") {
      axios.get(`/Distributor/User/${ID}`).then((list) => {
        if (list.data.length !== 0) {
          _setId(list.data[0]._id);
          setType("distributor");
          if (list.data[0].password === password) {
            setShowUserId("d-none");
            setShowUserPas("d-none");
            setResetPassword("d-block");
          } else {
            setResetPassword("d-none");
            setShowUserId("d-none");
            setShowUserPas("d-block");
          }
        } else {
          setNotice("UserId not valid!");
        }
      });
    } else if (ID.slice(0, 2) === "BB") {
      axios.get(`/BulkBreaker/User/${ID}`).then((list) => {
        if (list.data.length !== 0) {
          _setId(list.data[0]._id);
          setType("bulkbreaker");
          if (list.data[0].password === password) {
            setShowUserId("d-none");
            setShowUserPas("d-none");
            setResetPassword("d-block");
          } else {
            setResetPassword("d-none");
            setShowUserId("d-none");
            setShowUserPas("d-block");
          }
        } else {
          setNotice("UserId not valid!");
        }
      });
    } else if (ID.slice(0, 2) === "RT") {
      axios.get(`/Poc/User/${ID}`).then((list) => {
        if (list.data.length !== 0) {
          _setId(list.data[0]._id);
          setType("poc");
          if (list.data[0].password === password) {
            setShowUserId("d-none");
            setShowUserPas("d-none");
            setResetPassword("d-block");
          } else {
            setResetPassword("d-none");
            setShowUserId("d-none");
            setShowUserPas("d-block");
          }
        } else {
          setNotice("UserId not valid!");
        }
      });
    }
    // setShowUserId('d-none');
    // setShowUserPas('d-block');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let signInPromise;
    if (type === "distributor") {
      signInPromise = dispatch(
        authenticateDistributor(loginDetails.ID, loginDetails.password)
      );
    } else if (type === "bulkbreaker") {
      signInPromise = dispatch(
        authenticateBulkBreaker(loginDetails.ID, loginDetails.password)
      );
    } else if (type === "poc") {
      signInPromise = dispatch(
        authenticatePoc(loginDetails.ID, loginDetails.password)
      );
    } else {
      return;
    }

    signInPromise
      .then((userProducts) => {
        console.log("Request Done");
        if (
          userProducts.length < 1 ||
          JSON.stringify(userProducts[0]) === JSON.stringify({ 0: "0" })
        ) {
          history.push(`/info`);
        } else {
          history.push("/");
        }
      })
      .catch((error) => console.error(error.message));
  };

  return (
    // <React.Fragment style={{background: '#E5E3DF', padding: '10px', minHeight: '90vh', minWidth: '100%'}}>
    <Container
      maxWidth="sm"
      style={{
        overflow: "auto",
        marginTop: "10vh",
        background: "#E5E3DF",
        padding: "40px",
        borderRadius: "6px",
        maxWidth:"890px"
      }}
    >
      <div className={classes.root}>
        <Grid item xs={7} className="background">
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper className={classes.paper}>
            <Form onSubmit={handleSubmit} style={{ padding: "30px" }}>
              <div
                style={{
                  color: "#b11917",
                  fontSize: "18px",
                  fontWeight: "bold",
                  borderBottom: "1px solid grey",
                }}
                className={["text-center", showUserId].join(" ")}
              >
                Confirm Your Code
              </div>
              <span className={"text-danger mt-1"}>{notice}</span>
              <Form.Group controlId="formBasicNumber" className={showUserId}>
                <Form.Label
                  style={{ color: "grey" }}
                  className={"mt-3 font-weight-bold"}
                >
                  Enter Your Customer Code
                </Form.Label>
                <Form.Control
                  onChange={handleChange}
                  type="text"
                  name="ID"
                  placeholder="Example XTABC001"
                  required
                />
              </Form.Group>

              {/* resetPassword */}
              <div className={resetPassword}>
                <ResetPassword
                  userID={_id}
                  setUserPassword={setUserPassword}
                  type={type}
                />
              </div>

              <div
                style={{
                  color: "#b11917",
                  fontSize: "18px",
                  fontWeight: "bold",
                  borderBottom: "1px solid grey",
                }}
                className={["text-center", showUserPas].join(" ")}
              >
                Input your Password
              </div>

              <Form.Group controlId="formBasicPassword" className={showUserPas}>
                <Form.Label className={"mt-4 font-weight-bold"}>
                  Password
                </Form.Label>
                <Form.Control
                  onChange={handleChange}
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </Form.Group>

              <div
                style={{ color: "grey", marginTop: "10px", fontSize: "14px" }}
                className={showUserPas}
              >
                <LockIcon style={{ fontSize: "16px" }} />
                Forgot Password?{" "}
                <Link to="/" style={{ color: "#B11917" }}>
                  {" "}
                  click here.{" "}
                </Link>
              </div>

              <Button
                className={showUserId}
                onClick={toggler}
                style={{
                  backgroundColor: "#b11917",
                  border: "none",
                  width: "100%",
                  margin: "20px 0 10px 0",
                }}
              >
                Next
              </Button>

              <Button
                className={showUserPas}
                type="submit"
                style={{
                  backgroundColor: "#b11917",
                  border: "none",
                  width: "100%",
                  margin: "10px 0 10px 0",
                }}
              >
                Log in
              </Button>

              <div
                style={{ color: "grey", marginTop: "25px", fontSize: "13px" }}
              >
                <PersonIcon style={{ fontSize: "16px" }} /> Don't have an
                account or know your code?{" "}
                <Link to="/" style={{ color: "#B11917" }}>
                  {" "}
                  Ask our CIC Agent.{" "}
                </Link>
              </div>

              {/* <p>
            New user?{" "}
            <Link to="/distributor/signup">
              <span
                style={{
                  color: "#b11917",
                }}
              >
                Sign up!
              </span>
            </Link>
          </p> */}
            </Form>
          </Paper>
        </Grid>
      </div>
    </Container>
  );
};

export default UserSignIn;
