import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Typography from "@material-ui/core/Typography";
import { Form } from "react-bootstrap";

const ShowPricing = ({ show, setShowContent, product, handleInputChange, setMaxPriceAlert  }) => {

  const recPrice = Number(product.recommendedPrice.substring(1).replace(",",""));

  const handleClose = () => {
    setShowContent(false);
  }
   
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className={'text-center'}>
        <div>
          <Typography component="h6" variant="h6" style={{fontWeight: 'bold'}}>
            {`${product.brand} `}
            <span
              style={{
                color: "#b11917",
                fontWeight: 'bold'
              }}
            >
              {`${product.volume} (${product.sku})`}
            </span>
          </Typography>
          <br />
          <div>
            <Form.Group controlId="formBasicPrice">
              <Form.Control
                type="number"
                placeholder={Number(product.recommendedPrice.substring(1).replace(",",""))}
                onChange={(e) => handleInputChange(e, product._id, recPrice )}
                className={'font-weight-bold'}
                required
              />
            </Form.Group>
            <span className={'text-center'} style={{fontWeight: 'bold', fontSize: '12px', color: '#B11917'}}>{ setMaxPriceAlert === '' ? '': 'Your Price is below/beyond the Recommended Price' }</span>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>

        <Button
          onClick={handleClose}
          style={{
            backgroundColor: "#b11917",
            border: "none",
            width: "100%",
          }}
          disabled = { setMaxPriceAlert }
        >
          Update Price
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShowPricing;
