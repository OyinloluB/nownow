import React from "react";
import { Form, Button } from "react-bootstrap";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";

export const DistributorSignIn = () => {
  return (
    <Container
      maxWidth="sm"
      style={{
        overflow: "auto",
        margin: "15vh auto 0vh auto",
      }}
    >
      <Form>
      <Form.Group controlId="formBasicNumber">
          <Form.Label>User ID</Form.Label>
          <Form.Control type="number" placeholder="User ID" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
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
