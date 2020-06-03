import React from "react";
import { Modal, Button } from "react-bootstrap";
import Typography from "@material-ui/core/Typography";
import { Form } from "react-bootstrap";

const ShowPricing = ({ show, setShowContent, product, handleInputChange }) => {
  const handleClose = () => setShowContent(false);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>
        <div>
          <Typography component="h5" variant="h5">
            {`${product.brand} `}
            <span
              style={{
                color: "#b11917",
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
                placeholder="Input Price"
                onChange={(e) => handleInputChange(e, product._id)}
                required
              />
            </Form.Group>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={handleClose}
          style={{
            backgroundColor: "#b11917",
            border: "none",
          }}
        >
          Add Price
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShowPricing;
