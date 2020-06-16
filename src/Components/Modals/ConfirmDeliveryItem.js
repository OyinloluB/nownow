import React from "react";
import { ListGroup } from "react-bootstrap";

const itemStyles = {
  marginBottom: "0rem",
  fontSize: "14px",
  padding: "0.4rem 0.25rem",
};

const ConfirmDeliveryItem = () => {
  return (
    <>
      <ListGroup variant="flush">
        <ListGroup.Item style={itemStyles}>
          Budweiser &nbsp; <b>Price (4000)</b> &nbsp; <b>Qty (30)</b>
        </ListGroup.Item>
        <ListGroup.Item style={itemStyles}>Total: 4000</ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default ConfirmDeliveryItem;
