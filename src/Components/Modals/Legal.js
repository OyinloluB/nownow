import React from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

export const Legal = ({ show, setShow }) => {
  return (
    <>
      <Modal
        show={show}
        style={{
          width: "100%",
        }}
        backdrop = "static"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Body style={{padding: '10px', backgroundColor:"#b11917"}} className={'text-center'}>
          <p style={{color: '#fff'}}>
            By using ShopNow, you agree to the{" "}
            <Link to="/terms">Terms of Use, </Link>
            <Link to="/return">Return Policy </Link>
             and{" "}
            <Link to="privacy">Privacy Policy</Link>
          </p>
          <button
            onClick={() => setShow(false)}
            style={{
              padding: "10px",
              width: "100%",
              background: "white",
              border: "none",
            }}
          >
            I Accept
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
};