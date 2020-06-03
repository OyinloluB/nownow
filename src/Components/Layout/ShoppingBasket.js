import React from "react";
import { Modal, Button } from "react-bootstrap";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import BasketContent from "./BasketContent";

export const ShoppingBasket = ({ show, setShowBasket }) => {
  const handleClose = () => setShowBasket(false);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>
        <BasketContent />
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={handleClose}
          style={{
            backgroundColor: "#b11917",
            border: "none",
          }}
        >
          Add <AddShoppingCartIcon />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
