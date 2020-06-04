import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Container from "@material-ui/core/Container";

import {
  authenticateDistributor,
  authenticateBulkBreaker,
  authenticatePoc,
} from "../../../redux/auth/auth.actions";

import { useHistory } from "react-router-dom";

const UserSignIn = ({ type }) => {
  const [loginDetails, setLoginDetails] = useState({ ID: "", password: "" });
  const dispatch = useDispatch();
  const history = useHistory();
  const handleChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
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
      .then(() => {
        console.log("Request Done");
        if (loginDetails.password === "DDLCPD") {
          // history.push(`/${type}/info`);
          history.push("/");  
        } else {
          history.push("/");
        }
      })
      .catch((error) => console.error(error.message));
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        overflow: "auto",
        margin: "15vh auto 0vh auto",
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicNumber">
          <Form.Label>User ID</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="text"
            name="ID"
            placeholder="User ID"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        <Button
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
    </Container>
  );
};

export default UserSignIn;
