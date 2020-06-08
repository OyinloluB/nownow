import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
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
import CloseIcon from '@material-ui/icons/Close';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
// import * as Datetime from 'react-datetime';

import {
  removeFromCart,
  addToCart,
  clearFromCart,
  makeOrder,
} from "../../redux/cart/cart.actions";

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    // justifyContent: "space-around",
    // marginBottom: "20px",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
    fontSize: "18px"
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
  icon: { color: "red", fontSize: "13px" },
  header: { fontSize: "18px", fontWeight: "bold" },
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

  const [togglePaymentOption, setTogglePaymentOption] = useState('d-none');
  const [toggleCheckoutOption, setToggleChekoutOption] = useState('d-block');
  const [success, setSuccess] = useState('d-none');
  // radio button for payment method
  const [value, setValue] = useState('');
  
  const { items, total } = useSelector((state) => {
    console.log(state.cart.items)
    return {
      items: state.cart.items,
      total: state.cart.items.reduce((currentTotal, item) => {
        return currentTotal + item.price * item.quantity;
      }, 0),
    };
  });

  
  
  const handleClose = () => {
    setSuccess('d-none')
    setViewBasket(false);
  }

  const handleChange = (e) => {
    setValue(e.target.value);
    alert(e.target.value);
  }

  const handleToggle = () => {
    setToggleChekoutOption('d-none');
    setTogglePaymentOption('d-block');
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

  const handleSubmit = () => {
    dispatch(makeOrder())
      .then(() => {
        console.log("Order Made");
        handleClick({ vertical: "top", horizontal: "right" });
        setSuccess('d-block');
        setToggleChekoutOption('d-none');
        setTogglePaymentOption('d-none');
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

        <div className={toggleCheckoutOption}>
              <div className={'d-flex'}>
                <span className={'mr-auto'} style={{fontWeight: "bold", color: '#B11917'}} >Review Cart</span>
                <CloseIcon onClick={handleClose} />
              </div>
          </div>
          <div className={togglePaymentOption}>
              <div className={'d-flex'}>
                <span className={'mr-auto'} style={{fontWeight: "bold"}} >Payment Option</span>
                <CloseIcon onClick={handleClose} />
              </div>
          </div>

            <Card className={classes.root, toggleCheckoutOption }>
              {/* <img
                src={`${product.image}`}
                alt={`${product.brand} ${product.sku}`}
                className={classes.cover} 
              /> */}
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <ul className={'list-group'}>
                  <li className={'list-group-item m-0 p-1'} style={{color: "grey", fontSize: "12px"}}>
                      <div className={'d-flex'}>
                        <span className={'mr-auto'}>
                          Estimated Delivery Time
                        </span>
                        <span style={{color: "grey", fontSize: "12px"}}>
                            24-48 Hours
                        </span>
                      </div>
                    </li>
                  {items.map((product) => (
                    <li className={'list-group-item m-0 p-2'} style={{color: "grey", fontSize: "14px"}}>
                      <div className={'d-flex'}>
                        <span className={'mr-auto'}>
                          Order From
                        </span>
                        <span className={''} style={{color: "grey", fontSize: "14px"}}>
                            {product.userName}
                        </span>
                      </div>
                      <div className={'d-flex'}>
                        <span className={'mr-auto'}>
                          {product.brand} ({product.sku}) {product.volume}
                        </span>
                        <span className={''} style={{color: "grey", fontSize: "14px"}}>
                            &#8358;{product.price * product.quantity}
                        </span>
                      </div>
                      <div className={'d-flex'} style={{fontSize: '12px'}}>
                          <span className={'mr-auto'} onClick={() => handleRemoveFromCart(product)} style={{cursor: 'pointer'}}><CloseIcon className={classes.icon} style={{color: 'grey', fontSize: '11px'}}/> Remove </span>
                          <span style={{color: "grey", fontSize: "10px"}}>
                            <IconButton aria-label="remove" onClick={() => handleDecrement(product)} style={{ padding: '0px', borderRadius: '0px', border: '1px solid #b11917'}}>
                            <RemoveIcon className={classes.icon} />
                            </IconButton>
                            <span style={{padding: '7px'}}>{product.quantity}</span>
                            <IconButton aria-label="add" onClick={() => handleIncrement(product)} style={{ padding: '0px', borderRadius: '0px', border: '1px solid #b11917'}}>
                            <AddIcon className={classes.icon} />
                            </IconButton>
                          </span>
                      </div>
                    </li>

            ))}
                  </ul>
{/*                  
                  <Typography variant="subtitle1" color="textSecondary">
                  <span className="font-weight-bold">Placed On:</span> {newDate.getDate()}-{newDate.getMonth()+1}-{newDate.getFullYear()};
                </Typography> */}
                </CardContent>
              </div>
             
            </Card>
            <div className={toggleCheckoutOption}>
              
              <li className={'list-group-item m-0 p-2'} style={{color: "grey", fontSize: "14px"}}>
                  <div className={'d-flex font-weight-bold'}>
                    <span className={'mr-auto'}>
                        Total
                    </span>
                    <span>
                    &#8358; {total}
                    </span>
                  </div>
              </li>
            </div> 

            {/* Handling Payment Option */}
            <div className={togglePaymentOption}>
              <Card className={classes.root}>
                <CardContent className={classes.content}>
                  <li className={'list-group-item m-0 p-2'} style={{color: "grey", fontSize: "14px"}}>

                  <FormControl component="fieldset">
                  <FormLabel component="legend">Please Select Mode of Payment</FormLabel>
                    <RadioGroup aria-label="paymentMethod" name="paymentMethod" value={value} onChange={handleChange}>
                      <FormControlLabel value="cash" control={<Radio />} label="Pay by Cash" />
                      <FormControlLabel value="pos" control={<Radio />} label="Pay by POS" />
                      <FormControlLabel value="transfer" control={<Radio />} label="Pay br Transfer" />
                      
                    </RadioGroup>
                  </FormControl>
                    
                  </li>
                 
                </CardContent>
              </Card>
            </div>

            {/* Handling Payment Option */}
            <div className={success}>
              <Card className={classes.root}>
                <CardContent className={classes.content}>
                  <li className={'list-group-item m-0 p-2 d-flex'} style={{color: "grey", fontSize: "14px"}}>
                      <span className={'mr-auto'}>
                        Your Order has been successfully placed!
                      </span>
                      <CloseIcon onClick={handleClose} style={{cursor: 'pointer'}}/>
                  </li>
                </CardContent>
              </Card>
            </div>

            <Button
            
            style={{
              backgroundColor: "#b11917",
              border: "none",
              width: "100%"
            }}
            className = {toggleCheckoutOption}
            onClick = {handleToggle}

          >
            Proceed <ShoppingCartIcon /> 
          </Button>

          <Button
            
            style={{
              backgroundColor: "#b11917",
              border: "none",
              width: "100%"
            }}
            className = {togglePaymentOption}
            onClick = {handleSubmit}

          >
            Checkout <ShoppingCartIcon /> 
          </Button>

        </Modal.Body>

       
      </Modal>
    </>
  );
};
