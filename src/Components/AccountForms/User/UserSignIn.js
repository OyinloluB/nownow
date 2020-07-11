import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Container from "@material-ui/core/Container";
import axios from "../../../helpers/axios-client";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import ResetPassword from "../Prompts/ResetPassword";
import CicAgentContact from "../../Modals/CicAgentContact";
import FormPassword from "../FormPassword";
import "./login.css";

import {
  authenticateDistributor,
  authenticateBulkBreaker,
  authenticatePoc,
} from "../../../redux/auth/auth.actions";

import LockIcon from "@material-ui/icons/Lock";

const UserSignIn = () => {
  const [type, setType] = useState("");
  const [loginDetails, setLoginDetails] = useState({ ID: "", password: "" });
  const [showUserId, setShowUserId] = useState("d-block");
  const [showUserPas, setShowUserPas] = useState("d-none");
  const [resetPassword, setResetPassword] = useState("d-none");
  const [userPassword, setUserPassword] = useState({});
  const [_id, _setId] = useState("");
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleCicAgentContactOpen = () => {
    setShow(true);
  };

  const handleChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const [notice, setNotice] = useState("");

  const goBack = () => {
    setResetPassword("d-none");
    setShowUserId("d-block");
    setShowUserPas("d-none");
  };

  const toggler = () => {
    const ID = loginDetails.ID;

    if (ID.slice(0, 1) === "6" || ID.slice(0, 1) === "X") {
      axios.get(`/Distributor/User/${ID}`).then((list) => {
        setNotice("");
        if (list.data.length !== 0) {
          _setId(list.data[0]._id);
          setType("distributor");
          if (
            list.data[0].activated === false ||
            list.data[0].activated === undefined
          ) {
            setShowUserId("d-none");
            setShowUserPas("d-none");
            setResetPassword("d-block");
          } else {
            setResetPassword("d-none");
            setShowUserId("d-none");
            setShowUserPas("d-block");
          }
        } else {
          setNotice("UserId not valid!");
        }
      });
    } else if (ID.slice(0, 2) === "BB") {
      axios.get(`/BulkBreaker/User/${ID}`).then((list) => {
        setNotice("");

        if (list.data.length !== 0) {
          _setId(list.data[0]._id);
          setType("bulkbreaker");
          if (
            list.data[0].activated === false ||
            list.data[0].activated === undefined
          ) {
            setShowUserId("d-none");
            setShowUserPas("d-none");
            setResetPassword("d-block");
          } else {
            setResetPassword("d-none");
            setShowUserId("d-none");
            setShowUserPas("d-block");
          }
        } else {
          setNotice("UserId not valid!");
        }
      });
    } else if (ID.slice(0, 2) === "RT") {
      axios.get(`/Poc/User/${ID}`).then((list) => {
        setNotice("");

        if (list.data.length !== 0) {
          _setId(list.data[0]._id);
          setType("poc");
          if (
            list.data[0].activated === false ||
            list.data[0].activated === undefined
          ) {
            setShowUserId("d-none");
            setShowUserPas("d-none");
            setResetPassword("d-block");
          } else {
            setResetPassword("d-none");
            setShowUserId("d-none");
            setShowUserPas("d-block");
          }
        } else {
          setNotice("UserId not valid!");
        }
      });
    } else {
      setNotice("UserId not valid!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let signInPromise;
    if (type === "distributor") {
      signInPromise = dispatch(
        authenticateDistributor(loginDetails.ID, loginDetails.password)
      );
    } else if (type === "bulkbreaker") {
      signInPromise = dispatch(
        authenticateBulkBreaker(loginDetails.ID, loginDetails.password)
      );
    } else if (type === "poc") {
      signInPromise = dispatch(
        authenticatePoc(loginDetails.ID, loginDetails.password)
      );
    } else {
      return;
    }

    signInPromise
      .then((userProducts) => {
        if (
          userProducts.length < 1 ||
          JSON.stringify(userProducts[0]) === JSON.stringify({ 0: "0" })
        ) {
          history.push(`/info`);
        } else {
          window.location.href = "/";
        }
      })
      .catch((error) => setNotice("You just entered a wrong password"));
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        overflow: "auto",
        borderRadius: "6px",
        maxWidth: "900px",
        margin: "0vh auto 0vh auto",
      }}
      className={"mt-md-5"}
    >
      <CicAgentContact show={show} closeModal={() => setShow(false)} />

      <Row
        style={{
          border: "1px solid #E5E3DF",
        }}
      >
        <Col sm={8} className="background"></Col>
        <Col
          sm={4}
          style={{
            padding: "0px",
          }}
        >
          <Form
            onSubmit={handleSubmit}
            style={{
              padding: "20px",
              paddingBottom: "40px",
              background: "#E5E3DF",
            }}
          >
            <div
              style={{
                color: "#b11917",
                fontSize: "18px",
                fontWeight: "bold",
                borderBottom: "1px solid grey",
              }}
              className={["text-center", showUserId].join(" ")}
            >
              Confirm Your Code
            </div>
            <Form.Group controlId="formBasicNumber" className={showUserId}>
              <Form.Label
                style={{ color: "grey" }}
                className={"mt-1 mt-md-3 font-weight-bold"}
              >
                Enter Your Customer Code
              </Form.Label>
              <Form.Control
                onChange={handleChange}
                type="text"
                name="ID"
                placeholder="Example XTABC001"
                required
              />
            </Form.Group>

            <div className={resetPassword}>
              <KeyboardBackspaceIcon
                onClick={goBack}
                style={{ cursor: "pointer", marginBottom: "-40px" }}
              />
              <ResetPassword
                userID={_id}
                setUserPassword={setUserPassword}
                type={type}
              />
            </div>
            <div
              style={{
                color: "#b11917",
                fontSize: "16px",
                fontWeight: "bold",
                borderBottom: "1px solid grey",
              }}
              className={[showUserPas].join(" ")}
            >
              <KeyboardBackspaceIcon
                onClick={goBack}
                style={{ cursor: "pointer" }}
              />{" "}
              <span className={"offset-2 offset-md-1"}>
                {" "}
                Input your Password
              </span>
            </div>

            <Form.Group controlId="formBasicPassword" className={showUserPas}>
              <Form.Label className={"mt-1 mt-md-4 font-weight-bold"}>
                Password
              </Form.Label>
              <FormPassword
                name="password"
                placeholder="Password"
                required
                handleChange={handleChange}
              />
            </Form.Group>
            <span className={"text-danger text-center font-weight-bold"}>
              {notice}
            </span>
            <div
              style={{ color: "grey", marginTop: "10px", fontSize: "14px" }}
              className={showUserPas}
            >
              <LockIcon style={{ fontSize: "16px" }} />
              Forgot Password?{" "}
              <Link to="/forgetPassword" style={{ color: "#B11917" }}>
                {" "}
                click here.{" "}
              </Link>
            </div>

            <Button
              className={showUserId}
              onClick={toggler}
              style={{
                backgroundColor: "#b11917",
                border: "none",
                width: "100%",
                margin: "20px 0 10px 0",
              }}
            >
              Next
            </Button>
            <Button
              className={showUserPas}
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

            <div style={{ color: "grey", marginTop: "25px", fontSize: "13px" }}>
              <PersonIcon style={{ fontSize: "16px" }} /> Don't have an account
              or know your code?{" "}
              <Link
                onClick={handleCicAgentContactOpen}
                style={{ color: "#B11917" }}
              >
                {" "}
                Ask our CIC Agent.{" "}
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserSignIn;
