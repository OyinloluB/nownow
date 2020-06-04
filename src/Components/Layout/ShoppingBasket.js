import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import StoreItem from "./StoreItem";

import { addToCart } from "../../redux/cart/cart.actions";

const ShoppingBasket = ({ user, show, setShowBasket }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const dispacth = useDispatch();

  const handleClose = () => setShowBasket(false);

  const handleAddToCart = () => {
    selectedProducts.forEach((product) => {
      dispacth(addToCart(product));
    });
    setSelectedProducts([]);
    handleClose();
  };

  const memoSetProducts = useCallback((products) => {
    setSelectedProducts(products);
  }, []);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>
        {user.products.map((product, i) => (
          <StoreItem
            key={i}
            product={product}
            userId={user.userID}
            selectedProducts={selectedProducts}
            setProducts={memoSetProducts}
          />
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={handleAddToCart}
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

export default ShoppingBasket;
