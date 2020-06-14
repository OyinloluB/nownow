import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AllOutIcon from "@material-ui/icons/AllOut";

import Map from "./Map";
import ListHandler from "./ListHandler";
import SearchLocation from "../Layout/SearchLocation";

import { setCoordinates } from "../../redux/auth/auth.actions";
import { calcDistanceInKm } from "../../helpers/utility";

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

const modifyUsers = (users, coordinates) => {
  return users
    .map((user) => ({
      ...user,
      distance: calcDistanceInKm(coordinates, {
        lat: user.latitude,
        lng: user.longitude,
      }),
    }))
    .filter((user) => user.distance <= 2)
    .sort((userA, userB) => userA.distance - userB.distance)
    .slice(0, 30);
};

const Home = () => {
  const [showCustomerModal, setShowCustomerModal] = useState(false);

  const { user, isAuthenticated, coordinates } = useSelector((state) => state.auth);
  const { pocs, distributors, bulkbreakers } = useSelector((state) => state.user);

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        dispatch(
          setCoordinates({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        );
      });
    }

    else {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function (position) {
          dispatch(setCoordinates({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }));
        });
      }
    }

  }, [isAuthenticated, user, dispatch]);

  const users = {
    pocs: modifyUsers(pocs, coordinates),
    distributors: modifyUsers(distributors, coordinates),
    bulkbreakers: modifyUsers(bulkbreakers, coordinates),
  };

  return (
    <div>
      <Map users={isAuthenticated ? users : []} center={coordinates} />
      <ListHandler
        show={showCustomerModal}
        closeModal={() => setShowCustomerModal(false)}
        users={isAuthenticated ? users : []}
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
      {isAuthenticated ? <SearchLocation /> : null}
    </div>
  );
};

export default Home;
