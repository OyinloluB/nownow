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
  const [readOnly, setReadonly] = useState(true);
  const [readOnly_, setReadonly_] = useState(true);
  const [phnCheckVal, setphnCheckVal] = useState(true);
  const [whatsappCheckVal, setWhatsappCheckVal] = useState(true);
  const { user } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setContactDetails({ ...contactDetails, [e.target.name]: e.target.value });
  };

  const callCheckPhone = (e) => {
    if(phnCheckVal===true) {
      setphnCheckVal(false)
      setReadonly(false)
      console.log({readOnly})
    }
    else {
      setphnCheckVal(true)
      setReadonly(true)
    }
    console.log(e.target.value)
  }
  const callCheckWhatsapp = (e) => {
    if(whatsappCheckVal===true) {
      setWhatsappCheckVal(false)
      setReadonly_(false)
      // console.log({readOnly})
    }
    else {
      setWhatsappCheckVal(true)
      setReadonly_(true)
    }
    console.log(e.target.value)
  }

  const previous = () => {
    setCurrentPage(3);
  };

  const handleSubmit = (e) => {
    // console.log(contactDetails)
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
              <Form.Label className={'row ml-2'}>
                <Form.Check type="checkbox"  value={phnCheckVal} onChange={callCheckPhone} />
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
                readOnly={readOnly}
              />
            </Form.Group>
            <Form.Group
              controlId="formBasicNumber"
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Form.Label className={'row ml-2'}>
              <Form.Check type="checkbox"  value="whatsappTrue" onChange={callCheckWhatsapp} /> 
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
                readOnly={readOnly}
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
