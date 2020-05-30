import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import ProductsPricing from "./BulbbreakerPrompt/ProductsPricing";
import { HomeDeliveryPrompt } from "./BulbbreakerPrompt/HomeDeliveryPrompt";
import { PaymentModePrompt } from "./BulbbreakerPrompt/PaymentModePrompt";
import { ContactModePrompt } from "./BulbbreakerPrompt/ContactModePrompt";

export const BulbbreakerSignUp = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleSubmit = () => {
    console.log("Submitted");
    setCurrentPage(1);
  };
  if (currentPage === 1) {
    return <ProductsPricing setCurrentPage={setCurrentPage} />;
  } else if (currentPage === 2) {
    return (
      <div>
        <HomeDeliveryPrompt setCurrentPage={setCurrentPage} />
      </div>
    );
  } else if (currentPage === 3) {
    return (
      <div>
        <PaymentModePrompt setCurrentPage={setCurrentPage} />
      </div>
    );
  } else if (currentPage === 4) {
    return (
      <div>
        <ContactModePrompt setCurrentPage={setCurrentPage} />
      </div>
    );
  }

  return (
    <Container
      maxWidth="sm"
      style={{
        overflow: "auto",
        margin: "15vh auto 0vh auto",
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Text</Form.Label>
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
          Next
        </Button>
        <p>
          Aalready have an account?{" "}
          <Link to="/bulbbreaker/signin">
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
