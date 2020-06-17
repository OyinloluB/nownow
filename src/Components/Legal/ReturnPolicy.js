import React from "react";
import Container from "@material-ui/core/Container";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";

function Terms() {
  const history = useHistory();
  return (
    <div>
      <p
        onClick={() => {
          history.push("/");
        }}
        style={{
          padding: "10px",
          fontSize: "12px",
          cursor: "pointer",
          color: "#b11917",
        }}
      >
        <ArrowBackIcon />
        Back Home
      </p>
      <Container
        maxWidth="sm"
        style={{
          overflow: "auto",
          margin: "8vh auto 10vh auto",
        }}
      >
        <div>
          <div>
            <h2>RETURN POLICY</h2>
            <div>
              <p>
              At International Breweries PLC, we believe that the consumer is the boss and are fully 
              committed to providing our consumers with products of the highest possible Quality.
              </p>
              <p>
              If you believe there is a defect in the product(s) you purchased, please call our Consumer 
              Care Line on +234 (0) 700 600 7000 or send an e-mail to -----------------------
              @ng.ab-inbev.com to notify us of your intention to return the product(s). 
              Conditions constitutes your acceptance of those changes.
              </p>
              <p>
              When we receive your notification of return, you will be directed on how the product(s) 
              will be retrieved.
              </p>
              <p>
              We accept returns within 5 days from the date the product(s) was purchased. All returns will be 
              replaced with the same brand that was purchased (no cash refunds).
               
              </p>
              <p>
              Upon receipt of the returned product(s), we will fully examine it and notify you via e-mail, within 
              7 days, on the outcome of our analysis and whether you are entitled to a replacement. If you are 
              eligible, we will send you a replacement product or communicate to you how to collect the 
              replacement product(s).
              </p>
              <p>
              To be eligible for product replacement, please ensure that the product was not opened or 
              tampered with in any way.
              </p>
              <p>
              Thank you for your patronage.
              </p>
             
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Terms;
