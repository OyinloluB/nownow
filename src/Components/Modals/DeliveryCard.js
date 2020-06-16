import React from "react";
import ConfirmDeliveryItem from "./ConfirmDeliveryItem";

import { Button } from "react-bootstrap";

const DeliveryCard = ({ order }) => {
  const handleConfirmOrder = (confirmed) => {};
  return (
    <>
      <div style={{ padding: "1rem 1rem 0rem 1rem", borderBottom: "none" }}>
        <h3 style={{ fontSize: "16px" }}>
          Confirm Delivery from {order.owner.name}
        </h3>
      </div>
      <div>
        {order.items.map((item) => {
          return <ConfirmDeliveryItem key={item._id} item={item} />;
        })}
      </div>
      <p>Total : N {order.totalAmount}</p>
      <div>
        <div style={{ padding: "0.4rem 0.25rem", justifyContent: "space-between" }}>
          <p style={{ fontSize: "14px" }}>Did you receive your delivery?</p>
          <div>
            <Button variant="success" onClick={() => handleConfirmOrder(true)}>
              Yes
            </Button>
            <Button
              variant="danger"
              onClick={() => handleConfirmOrder(false)}
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
