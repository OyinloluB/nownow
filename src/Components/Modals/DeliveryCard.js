import React from "react";
import ConfirmDeliveryItem from "./ConfirmDeliveryItem";

import { Button } from "react-bootstrap";

const DeliveryCard = ({ handleClose }) => {
  const handleOrderConfirm = () => {};
  return (
    <>
      <div style={{ padding: "1rem 1rem 0rem 1rem", borderBottom: "none" }}>
        <h3 style={{ fontSize: "16px" }}>Confirm Delivery from Mrs Odeh Store</h3>
      </div>
      <div>
        <ConfirmDeliveryItem />
      </div>
      <div>
        <div style={{ padding: "0.4rem 0.25rem", justifyContent: "space-between" }}>
          <p style={{ fontSize: "14px" }}>Did you receive your delivery?</p>
          <div>
            <Button variant="success" onClick={handleClose}>
              Yes
            </Button>
            <Button
              variant="danger"
              onClick={handleClose}
              style={{ marginLeft: "10px" }}
            >
              No
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeliveryCard;
