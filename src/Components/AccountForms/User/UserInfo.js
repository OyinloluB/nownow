import React, { useState, useEffect, useCallback, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";

import ProductsPricing from "../Prompts/ProductsPricing";
import HomeDeliveryPrompt from "../Prompts/HomeDeliveryPrompt";
import PaymentModePrompt from "../Prompts/PaymentModePrompt";
import ContactModePrompt from "../Prompts/ContactModePrompt";

import {
  updateBulkbreaker,
  updateDistributor,
  updatePoc,
} from "../../../redux/user/user.actions";

const UserInfo = ({ type }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [productsDetails, setProductsDetails] = useState([]);
  const [homeDeliveryDetails, setHomeDeliveryDetails] = useState(false);
  const [paymentModeDetails, setPaymentModeDetails] = useState({});
  const [contactModeDetails, setContactModeDetails] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const updateInfo = useCallback(
    (
      productsDetails,
      homeDeliveryDetails,
      paymentModeDetails,
      contactModeDetails
    ) => {
      if (submitted) {
        let updateUserPromise;
        if (type === "poc") {
          updateUserPromise = dispatch(
            updatePoc(user.id, {
              delivery: homeDeliveryDetails,
              payment: paymentModeDetails,
              phone: contactModeDetails,
            })
          );
        } else if (type === "distributor") {
          updateUserPromise = dispatch(
            updateDistributor(user.id, {
              products: productsDetails,
              delivery: homeDeliveryDetails,
              payment: paymentModeDetails,
              phone: contactModeDetails,
            })
          );
        } else if (type === "bulkbreaker") {
          updateUserPromise = dispatch(
            updateBulkbreaker(user.id, {
              products: productsDetails,
              delivery: homeDeliveryDetails,
              payment: paymentModeDetails,
              phone: contactModeDetails,
            })
          );
        } else {
          return;
        }
        updateUserPromise
          .then(() => console.log("User Updated"))
          .catch((err) => console.log(err));
      }
    },
    [submitted, user, type, dispatch]
  );

  useEffect(() => {
    updateInfo(
      productsDetails,
      homeDeliveryDetails,
      paymentModeDetails,
      contactModeDetails
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
    setCurrentPage(type !== "poc" ? 1 : 2);
  };

  let currentPageComponent = null;

  if (currentPage === 1) {
    currentPageComponent = (
      <ProductsPricing
        setCurrentPage={setCurrentPage}
        setProductsDetails={setProductsDetails}
      />
    );
  } else if (currentPage === 2) {
    currentPageComponent = (
      <div>
        <HomeDeliveryPrompt
          setCurrentPage={setCurrentPage}
          setHomeDeliveryDetails={setHomeDeliveryDetails}
        />
      </div>
    );
  } else if (currentPage === 3) {
    currentPageComponent = (
      <div>
        <PaymentModePrompt
          setCurrentPage={setCurrentPage}
          setPaymentModeDetails={setPaymentModeDetails}
        />
      </div>
    );
  } else if (currentPage === 4) {
    currentPageComponent = (
      <div>
        <ContactModePrompt
          setContactModeDetails={setContactModeDetails}
          setSubmitted={setSubmitted}
        />
      </div>
    );
  }

  return currentPageComponent === null ? (
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
          <Link to={`/${type}/signin`}>
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
  ) : (
    currentPageComponent
  );
};

export default memo(UserInfo);