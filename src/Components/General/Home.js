import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { AllOut as AllOutIcon } from "@material-ui/icons";

import Map from "./Map";
import ListHandler from "./ListHandler";
import SearchLocation from "../Layout/SearchLocation";
import UserSignIn from "../AccountForms/User/UserSignIn";
import { Legal } from "../Modals/Legal";

import {
  setCoordinates,
  updateFirstTimerStatus,
} from "../../redux/auth/auth.actions";
import { calcDistanceInKm } from "../../helpers/utility";
import { getCoordinatesAddress } from "../../helpers/google-maps";

import "./home.css";

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
  const [users, setUsers] = useState({
    pocs: [],
    distributors: [],
    bulkbreakers: [],
  });

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

  useEffect(() => {
    setUsers({
      pocs: modifyUsers(pocs, coordinates),
      distributors: modifyUsers(distributors, coordinates),
      bulkbreakers: modifyUsers(bulkbreakers, coordinates),
    });
  }, [pocs, distributors, bulkbreakers, coordinates]);

  useEffect(() => {
    const fetchAddress = async (storeUsers, type) => {
      try {
        const updatedUsers = [];
        for await (const user of storeUsers) {
          if (user.latitude === 0) {
            user.address = "Not Available, contact through mobile number";
          } else {
            const address = await getCoordinatesAddress(
              user.latitude,
              user.longitude
              );
              user.address = address
              ? address
              : "Not Available, contact through mobile number";
          }
          updatedUsers.push(user);
        }
        setUsers((prevUsers) => ({
          ...prevUsers,
          [type]: [...updatedUsers],
        }));
      } catch (error) {
        console.log("Error Fetching Addresses: ", error);
      }
    };
    if (users.distributors.length !== 0) {
      fetchAddress(users.distributors, "distributors");
    }
    if (users.bulkbreakers.length !== 0) {
      fetchAddress(users.bulkbreakers, "bulkbreakers");
    }
    if (users.pocs.length !== 0) {
      fetchAddress(users.pocs, "pocs");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users.distributors.length, users.distributors.length, users.pocs.length]);

  // // function being called from check
  // function address(dat) {
  //   //  pushing the logger coordinate into the array
  //   dat.push({
  //     latitude: coordinates.lat,
  //     longitude: coordinates.lng,
  //     mapUrl:
  //       "https://thumbs.gfycat.com/EnchantingFinishedAplomadofalcon-max-1mb.gif",
  //   });
  //   // start mapping through
  //   dat.map((data) => {
  //     if (data.latitude === 0) {
  //       user.address = "Not Available, contact through mobile number";
  //     }
  //     // start fetching if coordinate exists
  //     else {
  //       // display loading while fetching progresses
  //       data.address = "Loading...";
  //       // fetching kick starts
  //       fetch(
  //         "https://maps.googleapis.com/maps/api/geocode/json?address=" +
  //           data.latitude +
  //           "," +
  //           data.longitude +
  //           "&key=" +
  //           API_KEY
  //       )
  //         .then((response) => response.json())
  //         .then((responseJson) => {
  //           if (responseJson.results.length > 1) {
  //             // forcing the fetched address into the users data
  //             data.address = responseJson.results[0].formatted_address;
  //           } else {
  //             data.address = "Loading...";
  //           }
  //         })
  //         .catch((error) => console.log("error"));
  //     }
  //   });
  // }
  // //  end of address

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
