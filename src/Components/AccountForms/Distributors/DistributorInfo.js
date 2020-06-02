import React, { useState, useEffect, useCallback, memo } from "react";
import { Form, Button } from "react-bootstrap";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import ProductsPricing from "./DistributorPrompt/ProductsPricing";
import { HomeDeliveryPrompt } from "./DistributorPrompt/HomeDeliveryPrompt";
import { PaymentModePrompt } from "./DistributorPrompt/PaymentModePrompt";
import { ContactModePrompt } from "./DistributorPrompt/ContactModePrompt";

const DistributorInfo = () => {
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

  let currentPageComponent = null;

  if (currentPage === 1) {
    currentPageComponent = (
      <ProductsPricing
        setCurrentPage={setCurrentPage}
        setPricingDetails={setPricingDetails}
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

  return { currentPageComponent ? currentPageComponent : };
};

export default memo(DistributorInfo);
