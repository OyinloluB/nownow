import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import PaymentIcon from "@material-ui/icons/Payment";
import Container from "@material-ui/core/Container";
import PaymentModeOption from "./PaymentModeOption";

export const PaymentModePrompt = ({ setCurrentPage }) => {
  const handleSubmit = () => {
    console.log("Submitted");
    setCurrentPage(4);
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        overflow: "auto",
        margin: "15vh auto 0vh auto",
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Dialog>
          <Modal.Header
            style={{
              backgroundColor: "#b11917",
            }}
          >
            <Modal.Title>
              <PaymentIcon style={{ color: "white", fontSize: 30 }} />
              <p style={{ color: "white", fontSize: "18px" }}>
                Select your mode of payment
              </p>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <PaymentModeOption />
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              style={{
                backgroundColor: "#b11917",
                border: "none",
                color: "white",
                width: "100%",
                margin: "10px 0 10px 0",
              }}
            >
              Next
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Form>
    </Container>
  );
};