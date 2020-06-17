import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AllOutIcon from "@material-ui/icons/AllOut";

import Map from "./Map";
import ListHandler from "./ListHandler";
import SearchLocation from "../Layout/SearchLocation";
import { Legal } from "../Modals/Legal";
import "./home.css";

import {
  setCoordinates,
  updateFirstTimerStatus,
} from "../../redux/auth/auth.actions";
import { calcDistanceInKm } from "../../helpers/utility";

import UserSignIn from "../AccountForms/User/UserSignIn";

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
    .filter((user) => user.distance < 3)
    .sort((userA, userB) => userA.distance - userB.distance)
    .slice(0, 60);
};

const Home = () => {
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [position, setPosition] = useState(false);

  const { user, isAuthenticated, coordinates } = useSelector((state) => state.auth);
  const { pocs, distributors, bulkbreakers } = useSelector((state) => state.user);

  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(
        setCoordinates({
          lat: user.latitude,
          lng: user.longitude,
        })
      );
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function (position) {
          dispatch(
            setCoordinates({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            })
          );
        });
      }
    }
  }, [isAuthenticated, user, dispatch, position]);

  const users = {
    pocs: modifyUsers(pocs, coordinates),
    distributors: modifyUsers(distributors, coordinates),
    bulkbreakers: modifyUsers(bulkbreakers, coordinates),
  };

  const setFirstTimeStatus = () => {
    dispatch(updateFirstTimerStatus());
  };

  return (
    <>
      <Legal show={user.firstTimer} setShow={setFirstTimeStatus} />
      <div style={{ position: "relative" }}>
        <Map users={isAuthenticated ? users : []} center={coordinates} />

        {isAuthenticated ? null : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              position: "fixed",
              top: "10%",
              width: "100%",
              fontSize: "13px",
            }}
          >
            <UserSignIn />
          </div>
        )}

        <ListHandler
          show={showCustomerModal}
          closeModal={() => setShowCustomerModal(false)}
          users={isAuthenticated ? users : []}
          resetCenter={() => setPosition(true)}
        />

        {isAuthenticated ? (
         
          <button
            className={["btn", classes.btn].join(" ")}
            onClick={() => setShowCustomerModal(true)}
          >
            <AllOutIcon /> View Customers
          </button>

        ) : null}
        {isAuthenticated ? <SearchLocation /> : null}
      </div>
    </>
  );
};

export default Home;
