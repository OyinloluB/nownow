import React from "react";
import { Modal, Button } from "react-bootstrap";
import AccountTypes from "./AccountTypes";

export const Signupas = ({ show, setShowPrompt }) => {
  const handleClose = () => setShowPrompt(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <AccountTypes />
      </Modal.Body>
    </Modal>
  );
};
