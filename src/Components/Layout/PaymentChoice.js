import React, {useState} from "react";

import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

import icon1 from "../../assets/icon1.JPG";
import icon2 from "../../assets/icon2.JPG";

const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const PaymentChoice = ({ owner, handlePaymentChange }) => {
  const [choice, setChoice] = useState('');
  const handleChange = (e) => {
    setChoice(e.target.value);
    handlePaymentChange(e.target.value);
  };
  return (
    <li
      className={"list-group-item mt-2 p-2"}
      style={{ color: "grey", fontSize: "14px" }}
    >
      <FormControl component="fieldset">
        <FormLabel component="legend" className={"mt-1"}>
          Please Select Mode of Payment for {owner.name}
        </FormLabel>
        <RadioGroup
          aria-label="paymentMethod"
          name="paymentMethod"
          value={choice}
          onChange={handleChange}
        >
          {owner.payment.cash ? (
            <div className={"row"}>
              <FormControlLabel
                className={"col-7"}
                value="cash"
                control={<GreenRadio />}
                label="Cash on Delivery"
              />{" "}
              <img
                src={icon2}
                width="50"
                height="40"
                className={"offset-1 offset-md-2 col-3 col-md-2"}
                alt="icon"
              />
            </div>
          ) : null}
          {owner.payment.transfer ? (
            <div className={"row"}>
              <FormControlLabel
                className={"col-7"}
                value="transfer"
                control={<GreenRadio />}
                label="Transfer on Delivery"
              />
              <img
                src={icon1}
                width="50"
                height="35"
                className={"offset-1 offset-md-2 col-3 col-md-2"}
                alt="icon"
              />
            </div>
          ) : null}
          {owner.payment.pos ? (
            <div className={"row"}>
              <FormControlLabel
                className={"col-7"}
                value="pos"
                control={<GreenRadio />}
                label="Debit Card on Delivery"
              />
              <img
                src="https://image.flaticon.com/icons/svg/81/81230.svg"
                width="50"
                height="40"
                className={"offset-1 offset-md-2 col-3 col-md-2"}
                alt="icon"
              />
            </div>
          ) : null}
        </RadioGroup>
      </FormControl>
    </li>
  );
};

export default React.memo(PaymentChoice);
