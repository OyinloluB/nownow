import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AllOutIcon from "@material-ui/icons/AllOut";
import Map from "./Map";
import ListHandler from "./ListHandler";
import SearchLocation from "../Layout/SearchLocation";
import { Modal, Button } from "react-bootstrap";
import axios from "../../axios-client";


const useStyles = makeStyles(() => ({
  btn: {
    position: "fixed",
    top: "30vh",
    left: "1%",
    color: "white",
    background: "#b11917",
    textJustify: "justify",
  },
}));

const Home = () => {
  const classes = useStyles();
  const history = useHistory();
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { pocs, distributors, bulkbreakers } = useSelector(
    (state) => state.user
    );
// console.log(pocs)
  const [coordinates, setCoordinates] = useState({
    lat: user.latitude,
    lng: user.longitude,
  });

  const [show, setShow] = useState(true);

  useEffect(() => {

    if(isAuthenticated) {
      if(window.confirm("Do you want Customers to see your store open?")){

        if(user.type==='distributor'){
          axios.patch(`/Distributor/${user.id}`, { confirmed: true }).then(list=>{})
        }
        else if(user.type==='bulkbreaker'){console.log(user.id)
          axios.patch(`/BulkBreaker/${user.id}`, { confirmed: true }).then(list=>{})
        }
        else if(user.type==='poc'){
          axios.patch(`/Poc/${user.id}`, { confirmed: true }).then(list=>{})
        }
      }
      else {
        if(user.type==='distributor'){
          axios.patch(`/Distributor/${user.id}`, { confirmed: false }).then(list=>{})
        }
        else if(user.type==='bulkbreaker'){
          axios.patch(`/BulkBreaker/${user.id}`, { confirmed: false }).then(list=>{})
        }
        else if(user.type==='poc'){
          axios.patch(`/Poc/${user.id}`, { confirmed: false }).then(list=>{})
        }
      }
    }

    // if (navigator.geolocation) {
    //   navigator.geolocation.watchPosition(function (position) {
    //     setCoordinates({
    //       lat: position.coords.latitude,
    //       lng: position.coords.longitude
    //     });
    //   });
    // }
  }, []);

  return (
    <div>
      <Map
        users={
          isAuthenticated ? [...pocs, ...distributors, ...bulkbreakers] : []
        }
        center={coordinates}
      />
      <ListHandler
        show={showCustomerModal}
        closeModal={() => setShowCustomerModal(false)}
        users={
          isAuthenticated ? [...pocs, ...distributors, ...bulkbreakers] : []
        }
      />
      {isAuthenticated ? (
        <button
          className={["btn", classes.btn].join(" ")}
          onClick={() => setShowCustomerModal(true)}
        >
          <AllOutIcon /> View Customers
        </button>
      ) : null}
      {isAuthenticated ? null : (
        <div
          style={{
            color: "#b11917",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            position: "fixed",
            bottom: "3vh",
            left: "2%",
            width: "10%",
            fontSize: "14px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          <p
            onClick={() => {
              history.push("/terms");
            }}
          >
            Terms
          </p>
          <p
            onClick={() => {
              history.push("/privacy");
            }}
          >
            Privacy
          </p>
        </div>
      )}
      {/* {isAuthenticated ? <SearchLocation /> : null} */}
    </div>
  );
};

export default Home;
