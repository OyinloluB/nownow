import React from "react";
import { ListGroup } from "react-bootstrap";

const itemStyles = {
  marginBottom: "0rem",
  fontSize: "14px",
  padding: "0.4rem 0.25rem",
};

const ConfirmDeliveryItem = ({ item }) => {
  return (
    <>
      <ListGroup variant="flush">
        <ListGroup.Item style={itemStyles}>
        {item.details.brand} &nbsp; <b>Price ({`N ${item.details.price}`})</b> &nbsp; <b>Qty ({item.quantity})</b>
        </ListGroup.Item>
        <ListGroup.Item style={itemStyles}>Total: 4000</ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default ConfirmDeliveryItem;
