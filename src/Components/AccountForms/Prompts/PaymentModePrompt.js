import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import PaymentIcon from "@material-ui/icons/Payment";
import Container from "@material-ui/core/Container";
import PaymentModeOption from "./PaymentModeOption";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const PaymentModePrompt = ({
  setCurrentPage,
  setPaymentModeDetails,
  paymentModeDetails,
}) => {
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    const newArray = [];
    if (paymentModeDetails.cash) {
      newArray.push("cash");
    }
    if (paymentModeDetails.pos) {
      newArray.push("pos");
    }
    if (paymentModeDetails.transfer) {
      newArray.push("transfer");
    }
    setChecked(newArray);
  }, []);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const previous = () => {
    setCurrentPage(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPaymentModeDetails({
      cash: checked.includes("cash") ? true : false,
      pos: checked.includes("pos") ? true : false,
      transfer: checked.includes("transfer") ? true : false,
    });
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
        <p
          style={{
            fontSize: "11px",
            backgroundColor: "#AADAFF",
            fontWeight: "bold",
            borderRadius: "4px",
          }}
          className={"text-center text-justify"}
        >
          Please note your mode of payment will be communicated with the buyer
        </p>
        <Modal.Dialog>
          <Modal.Header
            style={{
              backgroundColor: "#b11917",
            }}
          >
            <Modal.Title
              style={{ color: "white", fontSize: "18px" }}
              className={"text-center"}
            >
              <KeyboardBackspaceIcon
                className="mr-4"
                style={{ cursor: "pointer" }}
                onClick={previous}
              />
              <PaymentIcon style={{ color: "white", fontSize: 30 }} />
              &nbsp; How can your customers pay you?
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <PaymentModeOption checked={checked} handleToggle={handleToggle} />
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
          <span
            style={{ color: "#b11917", fontSize: "13px", fontWeight: "bold" }}
            className={"offset-5"}
          >
            Setup 3 of 4
          </span>
        </Modal.Dialog>
      </Form>
    </Container>
  );
};

export default PaymentModePrompt;
