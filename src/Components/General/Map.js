import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const { REACT_APP_GOOGLE_MAP_API_KEY: API_KEY } = process.env;

const Map = (props) => (
  <LoadScript googleMapsApiKey={API_KEY}>
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={props.center}
      zoom={35}
    >
      <Marker position={props.center} />
    </GoogleMap>
  </LoadScript>
);

export default Map;
