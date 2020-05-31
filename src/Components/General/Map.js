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

const Map = ({ center, users }) => {
  const [selectedCenter, setSelectedCenter] = useState(null);

  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
        {users.map((user) => (
          <Marker
            key={user.id}
            position={{ lat: user.latitude, lng: user.longitude }}
            onClick={() => {
              setSelectedCenter(user);
            }}
          >
            {selectedCenter && (
              <InfoWindow
                onCloseClick={() => {
                  setSelectedCenter(null);
                }}
                position={{
                  lat: selectedCenter.latitude,
                  lng: selectedCenter.longitude,
                }}
              >
                <div>
                  <p>{selectedCenter.name}</p>
                  <p>{selectedCenter.phone}</p>
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;