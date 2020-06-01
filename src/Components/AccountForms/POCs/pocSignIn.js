import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInPoc } from "../../../redux/auth/auth.actions";
import { Form, Button } from "react-bootstrap";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";

export const PocSignIn = () => {
  const dispatch = useDispatch();
  const [userLogin, setUserLogin] = useState({
    ID: 0,
    password: "",
  });

  const handleChange = (e) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userLogin);
    dispatch(signInPoc(userLogin));
  };

  const { ID, password } = userLogin;

  return (
    <Container
      maxWidth="sm"
      style={{
        overflow: "auto",
        margin: "15vh auto 0vh auto",
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicNumber">
          <Form.Label>User ID</Form.Label>
          <Form.Control
            type="number"
            value={ID}
            name="ID"
            placeholder="User ID"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </Form.Group>
        <Button
          type="submit"
          style={{
            backgroundColor: "#b11917",
            border: "none",
            width: "100%",
            margin: "10px 0 10px 0",
          }}
        >
          Log in
        </Button>
        {/* <p>
          New user?{" "}
          <Link to="/poc/signup">
            <span
              style={{
                color: "#b11917",
              }}
            >
              Sign up!
            </span>
          </Link>
        </p> */}
      </Form>
    </Container>
  );
};
