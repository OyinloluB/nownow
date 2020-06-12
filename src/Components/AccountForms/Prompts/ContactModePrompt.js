import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Form, Button } from "react-bootstrap";
import Container from "@material-ui/core/Container";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import CallIcon from "@material-ui/icons/Call";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Checkbox from '@material-ui/core/Checkbox';


const ContactModePrompt = ({ setCurrentPage, setContactModeDetails, setSubmitted }) => {
  const [checked, setChecked] = React.useState(true);

  const [contactDetails, setContactDetails] = useState({});
  const [phoneCall, setPhoneCall] = useState(true);
  const [whatsapp, setWhatsapp] = useState(true);
  const { user } = useSelector((state) => state.auth);

  
  const handleChangeWhatsapp = (e) => {
    setWhatsapp(!whatsapp)
    setContactDetails({ ...contactDetails, [e.target.name]: e.target.value });
    console.log(contactDetails)
  }

  const handleChangePhone = (e) => {
    setPhoneCall(!phoneCall)
    setContactDetails({ ...contactDetails, [e.target.name]: e.target.value });
    console.log(contactDetails)
  }
  
  const handleChange = (e) => {
    setContactDetails({ ...contactDetails, [e.target.name]: e.target.value });
    console.log(contactDetails)
  };

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
            <Modal.Title style={{ color: "white", fontSize: "16px" }} className={'text-center'}>
            <KeyboardBackspaceIcon className="mr-2 mr-md-4" style={{cursor: "pointer"}} onClick={previous} />
              <ContactPhoneIcon style={{ color: "white", fontSize: 24 }} />
              &nbsp; What is your preferred mode of contact?
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
              <Form.Label className={'row ml-md-2'}>
              <Checkbox
                size="small"
                color="default"
                inputProps={{ 'aria-label': 'Phone' }}
                name="viaPhoneCall"
                value = { phoneCall }
                onChange={handleChangePhone}
              />
                <CallIcon className={'mt-2'} style={{ color: "#b11917", fontSize: 20 }} />
                <span className={'mt-2'}> &nbsp; By Phone</span>
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
                // readOnly={readOnly}
              />
            </Form.Group>
            <Form.Group
              controlId="formBasicNumber"
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Form.Label className={'row ml-md-2'}>
              <Checkbox
                  size="small"
                  color="default"
                  inputProps={{ 'aria-label': 'Whatsapp' }}
                  name = "viaWhatsapp"
                  value = { whatsapp }
                  onChange={ handleChangeWhatsapp }
                />
                <WhatsAppIcon className={'mt-2'} style={{ color: "#b11917", fontSize: 20 }} />
                <span className={'mt-2'}> &nbsp; By WhatsApp</span>
              </Form.Label>
              <Form.Control
              
                style={{
                  width: "50%",
                }}
                type="tel"
                placeholder="Phone Number"
                name="whatsapp"
                onChange={handleChange}
                // readOnly={readOnly_}
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
                Finish Setup
            </Button>
            <span> { setCurrentPage } </span>
          </Modal.Footer>
        <span style={{color: '#b11917', fontSize: '13px', fontWeight: 'bold'}} className={'offset-5'}>Page 4 of 4</span>
        </Modal.Dialog>
      </Form>
    </Container>
  );
};

export default ContactModePrompt;
