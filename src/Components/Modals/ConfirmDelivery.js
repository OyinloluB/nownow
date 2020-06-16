import React from "react";
import { Modal, Button } from "react-bootstrap";

import DeliveryCard from "./DeliveryCard";

const ConfirmDelivery = ({ show, setShow }) => {
  const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <DeliveryCard handleClose={handleClose} show={show} setShow={setShow} />
      </Modal>
    </>
  );
};

export default ConfirmDelivery;
