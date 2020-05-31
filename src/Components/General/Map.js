import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const { REACT_APP_GOOGLE_MAP_API_KEY: API_KEY } = process.env;

const Map = ({ center, users }) => (
  <LoadScript googleMapsApiKey={API_KEY}>
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={
        users.length > 0
          ? { lat: users[0].latitude, lng: users[0].longitude }
          : center
      }
      zoom={10}
    >
      {users.map((user) => (
        <Marker
          key={user.id}
          position={{ lat: user.latitude, lng: user.longitude }}
        />
      ))}
    </GoogleMap>
  </LoadScript>
);

export default Map;
