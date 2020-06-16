import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const CicAgentContact = ({show, closeModal}) => {

  return (
    <>
      <Modal show={show} onHide={closeModal} backdrop="static">
        <Modal.Header>
          <Modal.Title style={{fontSize: '17px'}} className={'offset-2 offset-md-3'} >CIC Agent Contact Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body className={'text-center text-dark text-justify font-weight-bold'} style={{fontSize: '13px', color: '#B11917'}}>You can reach our CIC Agent for the type of support you need</Modal.Body>
        <span style={{fontSize: "7", textAlign: "center", fontWeight: 'bold' }}> Contact Email: <span style={{fontWeight: 'bold', color: '#b11917', fontSize: '12px'}}>IBShopNowSupport@AnheuserBuschInBev.onmicrosoft.com</span></span>
        <span style={{fontSize: "9", textAlign: "center", fontWeight: 'bold' }}> Mobile Number: <span style={{fontWeight: 'bold', color: '#b11917'}}>+2349062800131</span></span>
        
        <Modal.Footer className={'row'}>
          <Button
            onClick={closeModal}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #b11917",
              backgroundColor: "#b11917",
            }}
          >
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CicAgentContact;
