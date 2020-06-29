import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import CancelIcon from '@material-ui/icons/Cancel';

const ShowPricing = ({ show, setShowContent, product, handleInputChange, setMaxPriceAlert  }) => {

  const recPrice = Number(product.recommendedPrice.substring(1).replace(",",""));

  const handleClose = () => {
    setShowContent(false);
  }
   
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body>
        <div style={{fontSize: '13px'}}>
          <span style={{fontWeight: 'bold'}}>
            {`${product.brand} `}
            <span
              style={{
                color: "#b11917",
                fontWeight: 'bold'
              }}
            >
              {`${product.volume} (${product.sku})`}
              <CancelIcon style={{color: '#B11917'}} className={'offset-3'} onClick={ handleClose } />
            </span>
          </span>
          
          <div>
            <Form.Group controlId="formBasicPrice">
            <Form.Label className={'text-center font-weight-bold'}>Price Per Case (&#8358;):</Form.Label>
              <Form.Control
                type="number"
                placeholder={Number(product.recommendedPrice.substring(1).replace(",",""))}
                onChange={(e) => handleInputChange(e, product._id, recPrice )}
                className={'font-weight-bold'}
                required
              />
            </Form.Group>
            <span className={'text-center'} style={{fontWeight: 'bold', fontSize: '12px', color: '#B11917'}}>{ setMaxPriceAlert === 'low' ? 'You have entered an amount with no margin for profit': setMaxPriceAlert === 'high'? 'You have entered an amount that would not be competitive in the market' : '' }</span>
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
