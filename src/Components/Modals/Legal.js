import React from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

export const Legal = ({ show, setShow }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-100w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <p>
            By using ShopNow, you agree to the{" "}
            <Link to="/terms">Terms of Use</Link> and{" "}
            <Link to="privacy">Privacy Policy</Link>
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
};
