import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";

import {
  ShoppingCart as ShoppingCartIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Close as CloseIcon,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, IconButton, Snackbar } from "@material-ui/core";
import PaymentChoice from "./PaymentChoice";

import {
  removeFromCart,
  addToCart,
  clearFromCart,
  makeOrder,
  setCartItems,
} from "../../redux/cart/cart.actions";

const useStyles = makeStyles((theme) => ({
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
    fontSize: "18px",
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
  icon: { color: "red", fontSize: "14px", fontWeight: "bold" },
  header: { fontSize: "18px", fontWeight: "bold" },
}));

const ViewBasket = ({ show, setViewBasket }) => {
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

  const [togglePaymentOption, setTogglePaymentOption] = useState("d-none");
  const [toggleCheckoutOption, setToggleChekoutOption] = useState("d-block");
  const [success, setSuccess] = useState("d-none");
  const [notice, setNotice] = useState("");
  const [paymentModes, setPaymentModes] = useState({});

  const { items, total, owners } = useSelector((state) => {
    const totalQuantity = state.cart.items.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    const multiple = totalQuantity < 80 ? 1.026 : 1;
    const totalPrice = state.cart.items.reduce((currentTotal, item) => {
      return currentTotal + Math.floor(item.price * multiple * item.quantity);
    }, 0);
    const itemOwners = Array.from(new Set(state.cart.items.map((item) => item.userID)));
    return {
      items: state.cart.items,
      total: totalPrice,
      owners: itemOwners,
    };
  });

  const handleClose = () => {
    setSuccess("d-none");
    setViewBasket(false);
    setToggleChekoutOption("d-block");
    setTogglePaymentOption("d-none");
  };

  const handleToggle = () => {
    if (items.length === 0) {
      setNotice("Your Cart is Empty!");
    } else {
      setToggleChekoutOption("d-none");
      setTogglePaymentOption("d-block");
    }
  };

  const handleIncrement = (item) => {
    dispatch(addToCart(item));
  };

  const handleDecrement = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleRemoveFromCart = (item) => {
    dispatch(clearFromCart(item));
  };

  const handlePaymentModeChange = (ownerId, paymentMode) => {
    setPaymentModes((prevPaymentModes) => {
      return { ...prevPaymentModes, [ownerId]: paymentMode };
    });
  };

  const handleSubmit = async () => {
    // inserting mode of payment
    const updatedItems = items.map((item) => {
      return { ...item, paymentMode: paymentModes[item.userID] };
    });
    dispatch(setCartItems(updatedItems));
    dispatch(makeOrder())
      .then(() => {
        console.log("Order Made");
        handleClick({ vertical: "top", horizontal: "right" });
        setSuccess("d-block");
        setToggleChekoutOption("d-none");
        setTogglePaymentOption("d-none");
      })
      .catch((err) => {
        setSuccess("d-none");
        setToggleChekoutOption("d-block");
        setTogglePaymentOption("d-none");
        console.log(err);
      });
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
          <div className={toggleCheckoutOption}>
            <div className={"d-flex"}>
              <span
                className={"mr-auto offset-4 offset-md-5"}
                style={{ fontWeight: "bold", color: "#B11917" }}
              >
                Review Cart
              </span>
              <CloseIcon onClick={handleClose} />
            </div>
            <span
              style={{
                color: "#B11917",
              }}
            >
              {notice}
            </span>
          </div>
          <div className={togglePaymentOption}>
            <div className={"d-flex"}>
              <span className={"mr-auto"} style={{ fontWeight: "bold" }}>
                Payment Option
              </span>
              <CloseIcon onClick={handleClose} />
            </div>
          </div>

          <Card className={toggleCheckoutOption}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <ul className={"list-group"}>
                  <li
                    className={"list-group-item m-0 p-1"}
                    style={{ color: "grey", fontSize: "12px" }}
                  >
                    <div className={"d-flex font-weight-bold"}>
                      <span className={"mr-auto"}>Estimated Delivery Time</span>
                      <span style={{ color: "grey", fontSize: "12px" }}>
                        24-48 Hours
                      </span>
                    </div>
                  </li>
                  {items.map((product) => (
                    <li
                      className={"list-group-item m-0 p-2"}
                      style={{ color: "grey", fontSize: "14px" }}
                    >
                      <div className={"d-flex"}>
                        <span className={"mr-auto"}>Order From</span>
                        <span
                          className={""}
                          style={{ color: "grey", fontSize: "14px" }}
                        >
                          {product.userName}
                        </span>
                      </div>
                      <div className={"d-flex"}>
                        <span className={"mr-auto"}>
                          {product.brand} ({product.sku}) {product.volume}
                        </span>
                        <span
                          className={""}
                          style={{ color: "grey", fontSize: "14px" }}
                        >
                          &#8358;{product.price * product.quantity}
                        </span>
                      </div>

                      <div className={"d-flex"} style={{ fontSize: "12px" }}>
                        <span
                          className={"mr-auto"}
                          onClick={() => handleRemoveFromCart(product)}
                          style={{
                            cursor: "pointer",
                            color: "#b11917",
                            fontWeight: "bold",
                          }}
                        >
                          <CloseIcon
                            className={classes.icon}
                            style={{
                              fontSize: "11px",
                              color: "#b11917",
                              fontWeight: "bold",
                            }}
                          />{" "}
                          Remove{" "}
                        </span>
                        <span style={{ color: "grey", fontSize: "12px" }}>
                          <IconButton
                            aria-label="remove"
                            onClick={() => handleDecrement(product)}
                            style={{
                              padding: "0px",
                              borderRadius: "0px",
                              border: "1px solid #b11917",
                            }}
                          >
                            <RemoveIcon
                              className={classes.icon}
                              style={{ fontSize: "13px", fontWeight: "bold" }}
                            />
                          </IconButton>
                          <span style={{ padding: "7px" }}>{product.quantity}</span>
                          <IconButton
                            aria-label="add"
                            onClick={() => handleIncrement(product)}
                            style={{
                              padding: "0px",
                              borderRadius: "0px",
                              border: "1px solid #b11917",
                            }}
                          >
                            <AddIcon className={classes.icon} />
                          </IconButton>
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </div>
          </Card>
          <div className={toggleCheckoutOption}>
            <li
              className={"list-group-item m-0 p-2"}
              style={{ color: "black", fontSize: "14px" }}
            >
              <div className={"d-flex font-weight-bold"}>
                <span className={"mr-auto"}>Total</span>
                <span>&#8358; {total}</span>
              </div>
            </li>
          </div>

          {/* Handling Payment Option */}
          <div className={togglePaymentOption}>
            <Card className={classes.root}>
              <CardContent className={classes.content}>
                <span
                  className={"font-weight-bold mb-2"}
                  style={{ fontSize: "13px", color: "#B11917" }}
                >
                  Note:{" "}
                </span>
                <span
                  className={"mb-2"}
                  style={{ fontSize: "13px", color: "#B11917" }}
                >
                  Please note your mode of payment will be communicated with the
                  Seller and you will pay directly to them upon receipt of your order
                </span>
                {owners.map((ownerId) => {
                  const ownerItem = items.filter((item) => item.userID === ownerId)[0];
                  console.log(ownerItem);
                  return (
                    <PaymentChoice
                      owner={ownerItem.ownerDetails}
                      handlePaymentChange={(paymentMode) =>
                        handlePaymentModeChange(ownerId, paymentMode)
                      }
                    />
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Handling Payment Option */}
          <div className={success}>
            <Card className={classes.root}>
              <CardContent className={classes.content}>
                <li
                  className={"list-group-item m-0 p-2 d-flex"}
                  style={{ color: "grey", fontSize: "14px" }}
                >
                  <span className={"mr-auto text-success"}>
                    Your Order has been successfully placed!
                  </span>
                  <CloseIcon onClick={handleClose} style={{ cursor: "pointer" }} />
                </li>
              </CardContent>
            </Card>
          </div>

          <Button
            style={{
              backgroundColor: "#b11917",
              border: "none",
              width: "100%",
            }}
            className={toggleCheckoutOption}
            onClick={handleToggle}
          >
            Proceed <ShoppingCartIcon />
          </Button>

          <Button
            style={{
              backgroundColor: "#b11917",
              border: "none",
              width: "100%",
            }}
            className={togglePaymentOption}
            onClick={handleSubmit}
          >
            Checkout <ShoppingCartIcon />
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default React.memo(ViewBasket);
