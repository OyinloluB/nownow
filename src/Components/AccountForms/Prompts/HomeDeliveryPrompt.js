import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import Container from "@material-ui/core/Container";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const HomeDeliveryPrompt = ({ setCurrentPage, setHomeDeliveryDetails }) => {
  const [homeDelivery, setHomeDelivery] = useState(false);
  const [ noColor, setColorNo ] = useState('#fff');
  const [ yesColor, setColorYes ] = useState('#fff');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
    setHomeDeliveryDetails(homeDelivery);
    setCurrentPage(3);
  };

   const toggleColorYes = (e) =>{
     setColorNo("#fff");
     setColorYes("#28A745");
     e.target.style.color = "white";
      setHomeDelivery(true)
  };
  const toggleColorNo = (e) =>{
    e.preventDefault();
    setColorYes("#fff");
    setColorNo("#B11917")
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
      <p style={{fontSize: '10px', borderRadius: '4px', backgroundColor: '#AADAFF', fontWeight: 'bold'}} className={'text-center text-justify p-1'}>
          Please note your customers will be able to see that you can deliver to them or not when placing their order
      </p>
    
        <Modal.Dialog>
          <Modal.Header
            style={{
              backgroundColor: "#b11917",
            }}
          > 
            <Modal.Title style={{ color: "white", fontSize: "16px" }} className={'text-center'}>
              <KeyboardBackspaceIcon className="mr-4" style={{cursor: "pointer"}} onClick={previous} />
              <LocalShippingIcon style={{ color: "white", fontSize: 25 }} />
              &nbsp;
               Do you deliver products to your customers?
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className={'d-flex'}>
            <button
              type="button"
              className={'btn mr-auto'}
              style={{
                backgroundColor: yesColor,
                paddding: "25px",
                padddingBottom: "25px",
                border: "1px solid #28A745",
                borderRadius: "5px",
                fontWeight: "bold",
                color: yesColor==="#28A745"? "#fff" : "#28A745",
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
              className={'btn'}
              onClick={
                // setHomeDelivery(false),
                toggleColorNo
              }
              style={{
                backgroundColor: noColor,
                border: "1px solid #b11917",
                color: noColor==='#fff'? "#B11917" : "#fff",
                width: "30%",
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
          <span style={{color: '#b11917', fontSize: '13px', fontWeight: 'bold'}} className={'offset-5'}>Setup 2 of 4</span>
        </Modal.Dialog>
      </Form>
    </Container>
  );
};

export default HomeDeliveryPrompt;
