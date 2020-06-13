import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

import MarkerInfoWindow from "./MakerInfoWindow";

import { calcDistanceInKm } from "../../helpers/utility";

const containerStyle = {
  width: "100%",
  height: "100vh",
  marginTop: "7px",
};

const { REACT_APP_GOOGLE_MAP_API_KEY: API_KEY } = process.env;

const Map = ({ center, users }) => {
  const [closeUsers, setCloseUsers] = useState([]);

  useEffect(() => {
    setCloseUsers([
      ...Object.keys(users)
        .map((userType) => users[userType])
        .flat(),
    ]);
  }, [center, users]);

  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
        {closeUsers.map((user) => (
          <MarkerInfoWindow key={`${user.userID}--${user.id}`} user={user} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
