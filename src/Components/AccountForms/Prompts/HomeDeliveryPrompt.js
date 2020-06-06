import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import Container from "@material-ui/core/Container";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const HomeDeliveryPrompt = ({ setCurrentPage, setHomeDeliveryDetails }) => {
  const [homeDelivery, setHomeDelivery] = useState(false);
  // const [yesColor, setYesColor] = useState("#f7f7f7");
  // const [noColor, setNoColor] = useState("#f7f7f7");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
    setHomeDeliveryDetails(homeDelivery);
    setCurrentPage(5);
  };

  const previous = () => {
    setCurrentPage(3);
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
            <Modal.Title style={{ color: "white", fontSize: "18px" }}>
              <KeyboardBackspaceIcon className="mr-4" style={{cursor: "pointer"}} onClick={previous} />
              <LocalShippingIcon style={{ color: "white", fontSize: 30 }} />
              &nbsp;
              Do you deliver products to buyers?
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Button
              type="button"
              onClick={() => {
                setHomeDelivery(true);
              }}
              style={{
                backgroundColor: "#00FF00",
                border: "1px solid #00FF00",
                color: "white",
                width: "30%",
                marginRight: "10px",
              }}
            >
              Yes
            </Button>
            <Button
              type="button"
              onClick={() => {
                setHomeDelivery(false);
              }}
              style={{
                backgroundColor: "#b11917",
                border: "1px solid #b11917",
                color: "white",
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

export default HomeDeliveryPrompt;
