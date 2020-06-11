import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

import MarkerInfoWindow from "./MakerInfoWindow";

import { calcDistanceInKm } from "../../utility";

const containerStyle = {
  width: "100%",
  height: "100vh",
  marginTop: "7px",
};

const { REACT_APP_GOOGLE_MAP_API_KEY: API_KEY } = process.env;

const Map = ({ center, users }) => {
  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        {users
          .filter(
            (user) =>
              calcDistanceInKm(center, {
                lat: user.latitude,
                lng: user.longitude,
              }) <= 2
          )
          // .slice(0, 300)
          .map((user) => (
            <MarkerInfoWindow key={user.userID} user={user} />
          ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
