import React, { useState, useEffect, useCallback } from "react";
import { Form, Button } from "react-bootstrap";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import ProductsPricing from "./DistributorPrompt/ProductsPricing";
import { HomeDeliveryPrompt } from "./DistributorPrompt/HomeDeliveryPrompt";
import { PaymentModePrompt } from "./DistributorPrompt/PaymentModePrompt";
import { ContactModePrompt } from "./DistributorPrompt/ContactModePrompt";

export const DistributorSignUp = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pricingDetails, setPricingDetails] = useState({});
  const [homeDeliveryDetails, setHomeDeliveryDetails] = useState(false);
  const [paymentModeDetails, setPaymentModeDetails] = useState([]);
  const [contactModeDetails, setContactModeDetails] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSignUp = useCallback(
    (
      pricingDetails,
      homeDeliveryDetails,
      paymentModeDetails,
      contactModeDetails
    ) => {
      if (submitted) {
        console.log({
          pricing: pricingDetails,
          homeDelivery: homeDeliveryDetails,
          paymentMode: paymentModeDetails,
          contactMode: contactModeDetails,
        });
      }
    },
    [submitted]
  );

  useEffect(() => {
    handleSignUp(
      pricingDetails,
      homeDeliveryDetails,
      paymentModeDetails,
      contactModeDetails
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
    setCurrentPage(1);
  };

  if (currentPage === 1) {
    return (
      <ProductsPricing
        setCurrentPage={setCurrentPage}
        setPricingDetails={setPricingDetails}
      />
    );
  } else if (currentPage === 2) {
    return (
      <div>
        <HomeDeliveryPrompt
          setCurrentPage={setCurrentPage}
          setHomeDeliveryDetails={setHomeDeliveryDetails}
        />
      </div>
    );
  } else if (currentPage === 3) {
    return (
      <div>
        <PaymentModePrompt
          setCurrentPage={setCurrentPage}
          setPaymentModeDetails={setPaymentModeDetails}
        />
      </div>
    );
  } else if (currentPage === 4) {
    return (
      <div>
        <ContactModePrompt
          setContactModeDetails={setContactModeDetails}
          setSubmitted={setSubmitted}
        />
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
          <Form.Label>User ID</Form.Label>
          <Form.Control type="number" placeholder="User ID" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Create Password</Form.Label>
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
          Already have an account?{" "}
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
