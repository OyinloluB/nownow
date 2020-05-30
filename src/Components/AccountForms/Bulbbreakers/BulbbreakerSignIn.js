import React from "react";
import { Form, Button } from "react-bootstrap";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";

export const BulbbreakerSignIn = () => {
  return (
    <Container
      maxWidth="sm"
      style={{
        overflow: "auto",
        margin: "20vh auto 0vh auto",
      }}
    >
      <Form>
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
        <p>
          New user?{" "}
          <Link to="/bulbbreaker/signup">
            <span
              style={{
                color: "#b11917",
              }}
            >
              Sign up!
            </span>
          </Link>
        </p>
      </Form>
    </Container>
  );
};
