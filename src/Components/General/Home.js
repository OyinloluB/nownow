import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AllOutIcon from "@material-ui/icons/AllOut";

import Map from "./Map";
import ListHandler from "./ListHandler";

const useStyles = makeStyles(() => ({
  btn: {
    position: "fixed",
    bottom: "20vh",
    left: "10%",
    color: "white",
    background: "#b11917",
    boxShadow: "2px 2px 6px #888888",
    textJustify: "justify",
  },
}));

const Home = () => {
  const classes = useStyles();
  const [coordinates, setCoordinates] = useState({
    lat: 6.591511,
    lng: 3.490115,
  });
  const [showCustomerModal, setShowCustomerModal] = useState(false);

  const { isAuthenticated } = useSelector((state) => state.auth);
  const { pocs, distributors, bulkbreakers } = useSelector((state) => state.user);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        setCoordinates({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  return (
    <div>
      <Map
        users={isAuthenticated ? [...pocs, ...distributors, ...bulkbreakers] : []}
        center={coordinates}
      />
      <ListHandler
        show={showCustomerModal}
        closeModal={() => setShowCustomerModal(false)}
        users={isAuthenticated ? [...pocs, ...distributors, ...bulkbreakers] : []}
      />
      <button
        className={["btn", classes.btn].join(" ")}
        onClick={() => setShowCustomerModal(true)}
      >
        <AllOutIcon /> Check Nearby Customers
      </button>
    </div>
  );
};

export default Home;
