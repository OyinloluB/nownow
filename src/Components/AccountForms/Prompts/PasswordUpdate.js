import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import Container from "@material-ui/core/Container";
import { useDispatch} from "react-redux";
import {
    updateDistributorPassword,
    updateBulkBreakerPassword,
    updatePocPassword,
  } from "../../../redux/password/password.actions";

const PasswordUpdate = ({ setCurrentPage, type, userId }) => {
    console.log(type)
  const [userPassword, setUserPassword] = useState();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUserPassword({ ...userPassword, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");;

    // let updatePromise;
    // if (type === "distributor") {
    //     updatePromise = dispatch(
    //     updateDistributorPassword(userId, userPassword.password)
    //   );
    // }
    // else if (type === "bulkbreaker") {
    //     updatePromise = dispatch(
    //       updateBulkBreakerPassword(userId, userPassword.password)
    //     );
    //   } else if (type === "poc") {
    //     updatePromise = dispatch(
    //       // authenticatePoc(loginDetails.ID, loginDetails.password)
    //       updatePocPassword(userId, userPassword.password)
    //     );
    //   } else {
    //     return;
      }
  
    //   updatePromise
    //     .then((update) => {
    //       console.log("Request Done");
    //     //   set current page to 2
    //     })
    //     .catch((error) => console.error(error.message));
        setCurrentPage(3);
//   };

  return (
    <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Password"
            required
            />
        </Form.Group>
    </Form>
  );
};

export default PasswordUpdate;





