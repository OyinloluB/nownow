import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import Container from "@material-ui/core/Container";

export const HomeDeliveryPrompt = ({ setCurrentPage }) => {
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
              <LocalShippingIcon style={{ color: "white", fontSize: 30 }} />
              <p style={{ color: "white", fontSize: "18px" }}>
                Do you do home delivery?
              </p>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Button
              type="button"
              style={{
                backgroundColor: "#fff",
                border: "1px solid #b11917",
                color: "#b11917",
                width: "30%",
                marginRight: "10px",
              }}
            >
              Yes
            </Button>
            <Button
              type="button"
              style={{
                backgroundColor: "#fff",
                border: "1px solid #b11917",
                color: "#b11917",
                width: "30%",
                marginRight: "10px",
              }}
            >
              No
            </Button>
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
