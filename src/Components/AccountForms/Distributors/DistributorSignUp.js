import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Container from "@material-ui/core/Container";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Link } from "react-router-dom";
import ProductsPricing from "./ProductsPricing";

export const DistributorSignUp = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleSubmit = () => {
    console.log("Submitted");
    setCurrentPage(1);
  };
  if (currentPage === 1) {
    return (
      <Container
        maxWidth="sm"
        style={{
          overflow: "auto",
          margin: "20vh auto 10vh auto",
        }}
      >
        <h5
          style={{
            color: "#b11917",
            textAlign: "center",
          }}
        >
          Select the brand and SKU you sell and set your selling price below
        </h5>
        <br />
        <ProductsPricing />
        <br />
        <ProductsPricing />
        <br />
        <ProductsPricing />
        <br />
        <ProductsPricing />
        <br />{" "}
        <p
          style={{
            color: "#b11917",
          }}
        >
          View all
          <NavigateNextIcon />
        </p>
        <Button
          style={{
            backgroundColor: "#b11917",
            border: "none",
            width: "100%",
            margin: "10px 0 10px 0",
          }}
        >
          Next
        </Button>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="sm"
      style={{
        overflow: "auto",
        margin: "20vh auto 0vh auto",
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>User ID</Form.Label>
          <Form.Control type="email" placeholder="User ID" />
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
          Sign up
        </Button>
        <p>
          Aalready have an account?{" "}
          <Link to="/distributor/signin">
            <span
              style={{
                color: "#b11917",
              }}
            >
              Log in!
            </span>
          </Link>
        </p>
      </Form>
    </Container>
  );
};
