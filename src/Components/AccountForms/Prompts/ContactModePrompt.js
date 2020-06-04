import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Form, Button } from "react-bootstrap";
import Container from "@material-ui/core/Container";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import { useHistory } from "react-router-dom";
import CallIcon from "@material-ui/icons/Call";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";

const ContactModePrompt = ({ setContactModeDetails, setSubmitted }) => {
  const [contactDetails, setContactDetails] = useState({});
  const history = useHistory();
  const { user } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setContactDetails({ ...contactDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
    setContactModeDetails({
      ...contactDetails,
    });
    history.push("/");
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
            <Modal.Title>
              <ContactPhoneIcon style={{ color: "white", fontSize: 30 }} />
              <p style={{ color: "white", fontSize: "18px" }}>
                How would you like your customers to contact you?
              </p>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group controlId="formBasicNumber">
              <Form.Label>
                <CallIcon style={{ color: "#b11917", fontSize: 20 }} />
                &nbsp; By Phone
              </Form.Label>
              <Form.Control
                type="tel"
                placeholder="Phone Number"
                name="phone"
                defaultValue={`${user.phone}`}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicNumber">
              <Form.Label>
                <WhatsAppIcon style={{ color: "#b11917", fontSize: 20 }} />
                &nbsp; By WhatsApp
              </Form.Label>
              <Form.Control
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
