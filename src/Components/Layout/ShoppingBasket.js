import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Modal, Button, Alert } from "react-bootstrap";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import StoreItem from "./StoreItem";
import ClearIcon from "@material-ui/icons/Clear";
import { addToCart } from "../../redux/cart/cart.actions";
import InfoIcon from "@material-ui/icons/Info";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import PhoneIcon from "@material-ui/icons/Phone";

const ShoppingBasket = ({ user, show, setShowBasket, alertShow }) => {
  console.log("Rednering Shopping Basket");
  const [showAlert, setShowAlert] = useState({ alertShow });
  const [selectedProducts, setSelectedProducts] = useState([]);
  const dispacth = useDispatch();

  // console.log(user)
  const handleClose = () => {
    setShowBasket(false);
    setShowAlert("d-block");
  };

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
        <div className="d-flex  text-justify font-weight-bold">
          <p className="mr-auto m-2" style={{fontSize: '15px'}}>Buy from {user.name} </p>
          <ClearIcon className={showAlert} style={{margin: '10px'}} onClick={() => {setShowAlert('d-none')}} />
        </div>
          <Modal.Header className={showAlert} style={{backgroundColor: '#AADAFF', fontSize: '11px', fontWeight: 'bold'}}>
            <InfoIcon style={{fontSize: '14px'}}/> Note that the empties for all Returnable Glass Bottled Brands attract an extra cost of &#8358; 1,000 per case, if you do not purchase the item with your own empty case. Empty cost not applicable to cans. 
          </Modal.Header>

          <Modal.Body>
            <ul className={'list-group'}>
            {user.products.map((product, i) => (
              <StoreItem
                key={i}
                product={{ ...product, ownerType: user.type }}
                product={product}
                userId={user.userID}
                userName={user.name}
                selectedProducts={selectedProducts}
                setProducts={memoSetProducts}
              />
            ))}
            </ul>
          </Modal.Body>
          <Modal.Footer>
         
        <Button
          onClick={handleAddToCart}
          style={{
            backgroundColor: "green",
            border: "none",
          }}
        >
          Add <AddShoppingCartIcon />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default React.memo(ShoppingBasket);
