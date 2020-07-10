import React, { useState } from "react";
import { Form } from "react-bootstrap";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

const FormPassword = (props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const { handleChange, ...otherProps } = props;

  return (
    <div className="password-form-control">
      <Form.Control
        onChange={handleChange}
        type={isPasswordVisible ? "text" : "password"}
        {...otherProps}
      />
      <span
        className="password-form-control__toggle"
        onClick={handlePasswordVisibility}
      >
        {isPasswordVisible ? (
          <VisibilityOffIcon fontSize="small" />
        ) : (
          <VisibilityIcon fontSize="small" />
        )}
      </span>
    </div>
  );
};

export default FormPassword;
