import React from "react";
import { Modal } from "react-bootstrap";

import DeliveryCard from "./DeliveryCard";

const ConfirmDelivery = ({ show, setShow }) => {
  const handleClose = () => setShow(false);
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <DeliveryCard handleClose={handleClose} />
    </Modal>
  );
};

export default ConfirmDelivery;
