import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import Container from "@material-ui/core/Container";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const HomeDeliveryPrompt = ({ setCurrentPage, setHomeDeliveryDetails }) => {
  const [homeDelivery, setHomeDelivery] = useState(false);
  const [noColor, setNoColor] = useState("white");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
    setHomeDeliveryDetails(homeDelivery);
    setCurrentPage(3);
  };

   const toggleColorYes = (e) =>{
     e.target.style.backgroundColor = "#28A745";
     e.target.style.color = "white";
      setHomeDelivery(true)
  };
  const toggleColorNo = (e) =>{
    e.preventDefault();
    e.target.style.backgroundColor = "#b11917";
     e.target.style.color = "white";
    setHomeDelivery(false)
  }

  const previous = () => {
    setCurrentPage(1);
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
            <button
              type="button"
              className={'btn'}
              style={{
                backgroundColor: "white",
                paddding: "25px",
                padddingBottom: "25px",
                border: "1px solid #28A745",
                borderRadius: "5px",
                fontWeight: "bold",
                color: "#28A745",
                width: "30%",
                marginRight: "10px",
              }}
              onClick = {
                toggleColorYes
                // setHomeDelivery(true)
              }
            >
              Yes
            </button>
            <button
              type="button"
              className={'btn offset-3'}
              onClick={
                // setHomeDelivery(false),
                toggleColorNo
              }
              style={{
                backgroundColor: "white",
                border: "1px solid #b11917",
                color: "#b11917",
                width: "30%",
                marginRight: "10px",
              }}
            >
              No
            </button>
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
