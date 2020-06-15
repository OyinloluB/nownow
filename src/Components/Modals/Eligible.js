import React, { useState } from "react";
import { useDispatch } from 'react-redux';

//Bootstrap
import { Modal, Button } from "react-bootstrap";

import {setEligibility} from '../../redux/auth/auth.actions';

function Eligible() {
  const [show, setShow] = useState(true);
  const [warning, setWarning] = useState("");

  const dispatch = useDispatch();

  const handleClose = () => setShow(false);

  const handleNotEligible = () => {
    dispatch(setEligibility(false));
    setWarning("You are not eligible to proceed!");
  }
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header>
          <Modal.Title className={'offset-1 offset-md-3'}>Please confirm your age</Modal.Title>
        </Modal.Header>
        <Modal.Body className={'text-center text-danger'} style={{fontSize: '19px', color: '#B11917'}}>Are you 18 and above?</Modal.Body>
        <p style={{ color: "red", fontSize: "12", textAlign: "center" }} className={'text-danger'}>{warning}</p>
        <Modal.Footer className={'row'}>
          <Button
            onClick={handleClose}
            style={{
              width: "45%",
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
              width: "50%",
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
