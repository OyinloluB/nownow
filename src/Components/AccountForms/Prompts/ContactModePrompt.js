import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Form, Button } from "react-bootstrap";
import Container from "@material-ui/core/Container";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import CallIcon from "@material-ui/icons/Call";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';


const ContactModePrompt = ({ setCurrentPage, setContactModeDetails, setSubmitted }) => {
  const [contactDetails, setContactDetails] = useState({});
  const { user } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setContactDetails({ ...contactDetails, [e.target.name]: e.target.value });
  };

  const previous = () => {
    setCurrentPage(3);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
    setContactModeDetails({
      ...contactDetails,
    });
    setSubmitted(true);
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
              <ContactPhoneIcon style={{ color: "white", fontSize: 30 }} />
              &nbsp; How can customers contact you?
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group
              controlId="formBasicNumber"
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Form.Label>
                <CallIcon style={{ color: "#b11917", fontSize: 20 }} />
                &nbsp; By Phone
              </Form.Label>
              <Form.Control
                style={{
                  width: "50%",
                }}
                type="tel"
                placeholder="Phone Number"
                name="phone"
                defaultValue={`${user.phone}`}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group
              controlId="formBasicNumber"
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Form.Label>
                <WhatsAppIcon style={{ color: "#b11917", fontSize: 20 }} />
                &nbsp; By WhatsApp
              </Form.Label>
              <Form.Control
                style={{
                  width: "50%",
                }}
                type="tel"
                placeholder="Phone Number"
                name="whatsapp"
                onChange={handleChange}
                required
              />
            </Form.Group>
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

export default ContactModePrompt;
