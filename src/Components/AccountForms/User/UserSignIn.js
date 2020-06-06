import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch} from "react-redux";
import Container from "@material-ui/core/Container";

import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import PersonIcon from '@material-ui/icons/Person';
import {
  authenticateDistributor,
  authenticateBulkBreaker,
  authenticatePoc,
} from "../../../redux/auth/auth.actions";

const UserSignIn = ({ type }) => {
  const [loginDetails, setLoginDetails] = useState({ ID: "", password: "" });
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const [showPrompt, setShowPrompt] = useState(true);

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
          history.push(`/${type}/info`);
        } else {
          history.push("/");
        }
      })
      .catch((error) => console.error(error.message));
  };

  return (
      <React.Fragment style={{background: '#E5E3DF', padding: '10px', minHeight: '90vh', minWidth: '100%'}}>
      <Container
        maxWidth="sm"
        style={{
          overflow: "auto",
          margin: "15vh auto 0vh auto",
          background: '#E5E3DF',
          padding: '40px',
          borderRadius: '6px'
        }}
      >
        
        <Form onSubmit={handleSubmit}>
          <div style={{color: '#b11917', fontSize: '20px', fontWeight: 'bold', borderBottom: '1px solid grey'}}>Welcome</div>
          <Form.Group controlId="formBasicNumber" className="mt-3">
            <Form.Label style={{color: 'grey'}}>Enter Your Customer Code</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="text"
              name="ID"
              placeholder="Example XTABC001"
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
          <div style={{color: 'grey', marginTop: '30px'}}><PersonIcon style={{fontSize: '18px'}} /> Don't have an account or know your code? <Link to="/" style={{color: '#B11917'}}> Ask our CIC Agent. </Link></div>
          
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
      </React.Fragment>
    );
  };
  


export default UserSignIn;

