import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import Snackbar from "@material-ui/core/Snackbar";
// import * as Datetime from 'react-datetime';

import {
  removeFromCart,
  addToCart,
  clearFromCart,
  makeOrder,
} from "../../redux/cart/cart.actions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "20px",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: "40px",
    objectFit: "contain",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  icon: { color: "red", fontSize: "15" },
}));

export const ViewBasket = ({ show, setViewBasket }) => {
  let newDate = new Date()

  const classes = useStyles();
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const dispatch = useDispatch();

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  // const handleCloseSnackBar = () => {
  //   setState({ ...state, open: false });
  // };

  const handleClose = () => setViewBasket(false);

  const { items, total } = useSelector((state) => {
    return {
      items: state.cart.items,
      total: state.cart.items.reduce((currentTotal, item) => {
        return currentTotal + item.price * item.quantity;
      }, 0),
    };
  });

  const handleIncrement = (item) => {
    dispatch(addToCart(item));
  };

  const handleDecrement = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleRemoveFromCart = (item) => {
    dispatch(clearFromCart(item));
  };

  const handleSubmit = () => {
    dispatch(makeOrder())
      .then(() => {
        console.log("Order Made");
        handleClick({ vertical: "top", horizontal: "right" });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="Order successful"
        key={vertical + horizontal}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          {items.map((product) => (
            <Card className={classes.root}>
              <img
                src={`${product.image}`}
                alt={`${product.brand} ${product.sku}`}
                className={classes.cover}
              />
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography component="h5" variant="h5">
                    {product.brand} ({product.sku}) {product.volume}
                  </Typography>
                  <div className="mt-3">
                  <Typography variant="subtitle1" color="textSecondary">
                    <span className="font-weight-bold">Unit Price:</span> &#8358;{product.price}
                  </Typography>
                  </div>
                  <Typography variant="subtitle1" color="textSecondary">
                    <span className="font-weight-bold">Quantity:</span> 
                    <IconButton aria-label="remove" onClick={() => handleDecrement(product)} >
                    <RemoveIcon className={classes.icon} />
                  </IconButton>
                  <span>{product.quantity}</span>
                  <IconButton aria-label="add" onClick={() => handleIncrement(product)} >
                    <AddIcon className={classes.icon} />
                  </IconButton>
                  </Typography>

                  <Typography variant="subtitle1" color="textSecondary">
                    <span className="font-weight-bold">Cost:</span> &#8358;{product.price * product.quantity}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    <span className="font-weight-bold">Placed On:</span> {newDate.getDate()}-{newDate.getMonth()+1}-{newDate.getFullYear()};
                  </Typography>
                </CardContent>
            
                
                <Button
                  style={{
                    backgroundColor: "#f7f7f7",
                    color: "#b11917",
                    border: "none",
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                  onClick={() => handleRemoveFromCart(product)}
                >
                  <RemoveShoppingCartIcon
                    style={{ color: "#b11917", fontSize: "20" }}
                  />
                </Button>
                <br />
              </div>
            </Card>
          ))}
          <div
            style={{
              textAlign: "right",
              width: "100%",
            }}
          >
            <h5>
              Total: <span>&#8358;{total}</span>
            </h5>
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
            Close
          </Button>
          <Button
            onClick={handleSubmit}
            style={{
              backgroundColor: "#b11917",
              border: "none",
            }}
          >
            Checkout <ShoppingCartIcon />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
