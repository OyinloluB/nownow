import React from "react";
import { useSelector } from "react-redux";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

import MarkerInfoWindow from "./MakerInfoWindow";

const containerStyle = {
  width: "100%",
  height: "100vh",
  marginTop:"7px"
};

const { REACT_APP_GOOGLE_MAP_API_KEY: API_KEY } = process.env;

const Map = ({ center, users }) => {
  const { type } = useSelector((state) => state.auth);
  // console.log(users)
  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
        {users.slice(1,20).map((user) => (
          <MarkerInfoWindow key={user.id} user={user} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
