import React, { useState } from "react";

import { Form, Button } from "react-bootstrap";
import FormPassword from "../FormPassword";

import axios from "../../../helpers/axios-client";

const ResetPassword = ({ userID, setResetPassword, type }) => {
  const [pwd, setPwd] = useState({});
  const [notice, setNotice] = useState("");

  const handleSetPassword = () => {
    if (pwd.password === pwd.cpassword) {
      if (pwd.password === "DDLCPD") {
        setNotice("Please use a non-default password!");
      } else {
        let password = pwd.password;
        if (type === "distributor") {
          axios
            .patch(`/Distributor/changepassword/${userID}`, {
              password: password,
              activated: true,
            })
            .then((list) => {
              window.location.reload(false);
            })
            .catch((error) => console.error(error));
        } else if (type === "bulkbreaker") {
          axios
            .patch(`/BulkBreaker/changepassword/${userID}`, {
              password: password,
              activated: true,
            })
            .then((list) => {
              window.location.reload(false);
            })
            .catch((error) => console.error(error));
        } else if (type === "poc") {
          axios
            .patch(`/Poc/changepassword/${userID}`, {
              password: password,
              activated: true,
            })
            .then((list) => {
              window.location.reload(false);
            })
            .catch((error) => console.error(error));
        }
      }
    } else {
      setNotice("Confirm Password is not the same as your Password!");
    }
  };

  const handleChange = (e) => {
    setPwd({ ...pwd, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div
        style={{
          color: "#b11917",
          fontSize: "20px",
          fontWeight: "bold",
          borderBottom: "1px solid grey",
        }}
        className={"text-center"}
      >
        Set your Password
      </div>
      <div
        className={"text-danger font-weight-bold"}
        style={{ fontSize: "13px" }}
      >
        {notice}
      </div>
      <Form.Group controlId="formBasicPassword">
        <Form.Label className={"mt-3 font-weight-bold"}>
          Choose a Password
        </Form.Label>
        <FormPassword
          placeholder="Enter New Password"
          name="password"
          handleChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label className={"mt-3 font-weight-bold"}>
          Confirm Password
        </Form.Label>

        <FormPassword
          placeholder="Confirm New Password"
          name="cpassword"
          handleChange={handleChange}
        />
      </Form.Group>

      <Button
        style={{
          backgroundColor: "#b11917",
          border: "none",
          width: "100%",
          margin: "10px 0 10px 0",
        }}
        onClick={handleSetPassword}
      >
        Set Password
      </Button>
    </div>
  );
};

export default ResetPassword;
