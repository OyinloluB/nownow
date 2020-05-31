import React, { useState } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";

import InfoWindowTooltip from './InfoWindowTooltip';

const MarkerInfoWindow = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Marker
      position={{ lat: user.latitude, lng: user.longitude }}
      onClick={() => setIsOpen(!isOpen)}
    >
      {isOpen && (
        <InfoWindow
          onCloseClick={() => setIsOpen(false)}
          position={{
            lat: user.latitude,
            lng: user.longitude,
          }}
        >
          <InfoWindowTooltip user={user} />
        </InfoWindow>
      )}
    </Marker>
  );
};

export default MarkerInfoWindow;
