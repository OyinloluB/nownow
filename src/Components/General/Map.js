import React from "react";
import { useSelector } from "react-redux";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

import MarkerInfoWindow from "./MakerInfoWindow";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const { REACT_APP_GOOGLE_MAP_API_KEY: API_KEY } = process.env;

const Map = ({ center, users }) => {
  const { type } = useSelector((state) => state.auth);

  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
        {users.map((user) => (
          <MarkerInfoWindow
            key={user.id}
            user={user}
            // icon={{
            //   scaledSize: new window.google.maps.Size(20, 20),
            // }}
            // style={{ color: "green" }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
