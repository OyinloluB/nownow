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
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import icon1 from "../../assets/icon1.JPG";
import icon2 from "../../assets/icon2.JPG";

// import * as Datetime from 'react-datetime';

import {
  removeFromCart,
  addToCart,
  clearFromCart,
  makeOrder,
} from "../../redux/cart/cart.actions";

const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

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
  icon: { color: "red", fontSize: "14px", fontWeight: 'bold' },
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
    const totalQuantity = state.cart.items.reduce((acc, item) => acc + item.quantity, 0);
    const multiple = totalQuantity >= 80 ? 0.981 : 1;
    const totalPrice = state.cart.items.reduce((currentTotal, item) => {
      return currentTotal + Math.floor((item.price * multiple) * item.quantity);
    }, 0);
    return {
      items: state.cart.items,
      total: totalPrice
    };
  });

  const handleClose = () => {
    setSuccess('d-none')
    setViewBasket(false);
    setToggleChekoutOption('d-block');
    setTogglePaymentOption('d-none');
  }

  const handleChange = (e) => {
    setValue(e.target.value);
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

    // inserting mode of payment
    items.map((modeOfPayment)=>{
        return modeOfPayment.paymentMode = value;
    })
    dispatch(makeOrder())
      .then(() => {
        console.log("Order Made");
        handleClick({ vertical: "top", horizontal: "right" });
        setSuccess('d-block');
        setToggleChekoutOption('d-none');
        setTogglePaymentOption('d-none');
      })
      .catch((err) => {
        setSuccess('d-none');
        setToggleChekoutOption('d-block');
        setTogglePaymentOption('d-none');
        console.log(err)
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
              <div className={'d-flex'}>
                <span className={'mr-auto offset-4 offset-md-5'} style={{fontWeight: "bold", color: '#B11917'}} >Review Cart</span>
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
                      <div className={'d-flex font-weight-bold'}>
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
                          <span className={'mr-auto'} onClick={() => handleRemoveFromCart(product)} style={{cursor: 'pointer', color: '#b11917', fontWeight: 'bold'}}><CloseIcon className={classes.icon} style={{fontSize: '11px', color: '#b11917', fontWeight: 'bold'}}/> Remove </span>
                          <span style={{color: "grey", fontSize: "12px"}}>
                            <IconButton aria-label="remove" onClick={() => handleDecrement(product)} style={{ padding: '0px', borderRadius: '0px', border: '1px solid #b11917'}}>
                            <RemoveIcon className={classes.icon} style={{fontSize: "13px", fontWeight: 'bold'}}/>
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
              
              <li className={'list-group-item m-0 p-2'} style={{color: "black", fontSize: "14px"}}>
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
                  <span className={'font-weight-bold mb-2'} style={{fontSize: '13px', color:'#B11917'}}>Note: </span><span className={'mb-2'} style={{fontSize: '13px', color:'#B11917'}}>Please note your mode of payment will be communicated with the Seller and you will pay directly to them upon receipt of your order</span>

                  <li className={'list-group-item mt-2 p-2'} style={{color: "grey", fontSize: "14px"}}>
                  <FormControl component="fieldset">
                  <FormLabel component="legend" className={'mt-1'}>Please Select Mode of Payment</FormLabel>
                    <RadioGroup aria-label="paymentMethod" name="paymentMethod" value={value} onChange={handleChange}>
                      <div className={'row'}>
                        <FormControlLabel className={'col-7'} value="cash" control={<GreenRadio />} label="Cash on Delivery" /> <img src={icon2} width="50" height="40"  className={'offset-1 offset-md-2 col-3 col-md-2'}/>
                      </div>
                      <div className={'row'}>
                        <FormControlLabel className={'col-7'} value="transfer" control={<GreenRadio />} label="Transfer on Delivery" />
                        <img src={icon1} width="50" height="35"  className={'offset-1 offset-md-2 col-3 col-md-2'}/>
                      </div>
                      <div className={'row'}>
                        <FormControlLabel className={'col-7'} value="pos" control={<GreenRadio />} label="Debit Card on Delivery" />
                        <img src="https://image.flaticon.com/icons/svg/81/81230.svg" width="50" height="40"  className={'offset-1 offset-md-2 col-3 col-md-2'}/>
                      </div>
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
                      <span className={'mr-auto text-success'}>
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
