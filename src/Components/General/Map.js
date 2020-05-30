import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const { REACT_APP_GOOGLE_MAP_API_KEY: API_KEY } = process.env;

const Map = ({ center, markers }) => (
  <LoadScript googleMapsApiKey={API_KEY}>
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={20}>
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={{ lat: marker.lat, lng: marker.lng }}
        />
      ))}
    </GoogleMap>
  </LoadScript>
);

export default Map;
