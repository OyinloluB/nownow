import React from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

import classes from "./legal.module.css";

export const Legal = ({ show, setShow }) => {
  return (
    <>
      <Modal
        show={show}
        style={{
          width: "100%",
        }}
        backdrop="static"
        aria-labelledby="example-custom-modal-styling-title"
        className={classes.modal_dialog}
      >
        <Modal.Body
          style={{
            padding: "10px",
            backgroundColor: "rgba(0, 0, 0, .8)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "80px",
          }}
          className={["text-center", classes.modal_content].join(" ")}
        >
          <p style={{ color: "#fff" }}>
            By using ShopNow, you agree to the{" "}
            <Link to="/terms">Terms of Use, </Link>
            <Link to="/return">Return Policy </Link>
            and <Link to="privacy">Privacy Policy</Link>
          </p>
          <button
            onClick={() => setShow(false)}
            style={{
              padding: "10px",
              width: "15%",
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
