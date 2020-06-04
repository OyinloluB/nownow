import React, { useState } from "react";

//Bootstrap
import { Modal, Button } from "react-bootstrap";

function Eligible() {
  const [show, setShow] = useState(true);
  const [warning, setWarning] = useState("");

  const handleClose = () => setShow(false);

  const handleNotEligible = () =>
    setWarning("You are not eligible to proceed!");

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header>
          <Modal.Title>Please confirm your age</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you 18 and above?</Modal.Body>
        <p style={{ color: "red", fontSize: "12" }}>{warning}</p>
        <Modal.Footer>
          <Button
            onClick={handleClose}
            style={{
              width: "184px",
              padding: "10px",
              border: "1px solid #b11917",
              backgroundColor: "#b11917",
            }}
          >
            Yes I am 18+
          </Button>
          <Button
            variant="secondary"
            onClick={handleNotEligible}
            style={{
              width: "91px",
              padding: "10px",
            }}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Eligible;
