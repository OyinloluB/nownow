import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import StoreItem from "./StoreItem";
import ClearIcon from "@material-ui/icons/Clear";
import { addToCart } from "../../redux/cart/cart.actions";
import InfoIcon from "@material-ui/icons/Info";
import { useSelector } from "react-redux";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ViewBasket from "./ViewBasket";

const ShoppingBasket = ({ user, show, setShowBasket, alertShow }) => {
  const [showAlert, setShowAlert] = useState({ alertShow });
  const [selectedProducts, setSelectedProducts] = useState([]);
  const { user: loggedInUser } = useSelector((state) => state.auth);
  const dispacth = useDispatch();
  const [viewBasket, setViewBasket] = useState(false);

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

  const handleCheckout = () => {
    handleAddToCart();
    setViewBasket(true)
  }

  return (
    <>
      <ViewBasket show={viewBasket} setViewBasket={setViewBasket} />
      <Modal show={show} onHide={handleClose}>
        <div className="d-flex  text-justify font-weight-bold">
          <p className="mr-auto m-2" style={{fontSize: '15px'}}>Buy from {user.name} </p>
          <ClearIcon className={showAlert} style={{margin: '10px'}} onClick={() => {setShowAlert('d-none')}} />
        </div>
          <Modal.Header className={showAlert} style={{backgroundColor: '#AADAFF', fontSize: '11px', fontWeight: 'bold'}}>
            <InfoIcon style={{fontSize: '14px'}}/> Note that the empties for all Returnable Glass Bottled Brands attract an extra cost of &#8358; 1,000 per case, if you do not purchase the item with your own empty case. Empty cost not applicable to cans. 
           
          </Modal.Header>
            { user.type==='distributor' && loggedInUser.type==='poc'? (
                <p className={'text-justify font-weight-bold text-danger text-center p-1'} style={{fontSize: '12px'}}>Please note that for orders of 80 cases and above, you will get at wholesale price</p>
            ):null }

          <Modal.Body>
            <ul className={'list-group'}>
            {user.products.map((product, i) => (
              <StoreItem
                key={i}
                product={{ ...product, ownerType: user.type }}
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
            backgroundColor: '#480D0C',
            border: "none",
            width: '47%'
          }}
        >
          Add to Cart<AddShoppingCartIcon />
        </Button>

        <Button
          onClick={handleCheckout}
          style={{
            backgroundColor: "green",
            border: "none",
            width: '49%',
          }}
        >
           Proceed to Checkout<ShoppingCartIcon />
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
};

export default React.memo(ShoppingBasket);
