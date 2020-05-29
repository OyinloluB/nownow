import React from "react";
import { Modal, Button } from "react-bootstrap";
import AccountTypes from "./AccountTypes";

export const Signupas = ({ show, setShowPrompt }) => {
  const handleClose = () => setShowPrompt(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body closeButton>
        <AccountTypes handleClose={handleClose} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={handleClose}
          style={{
            backgroundColor: "#b11917",
            border: "none",
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
