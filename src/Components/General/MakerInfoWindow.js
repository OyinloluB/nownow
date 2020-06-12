import React, { useState } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import InfoWindowTooltip from "./InfoWindowTooltip";

var MarkerInfoWindow = ({ user }) => {

  var [isOpen, setIsOpen] = useState(false);
  return (
    <Marker
      position={{ lat: user.latitude, lng: user.longitude }}
    
      icon={{
        url: user.mapUrl,
        scaledSize:  new window.google.maps.Size(30,30)
      }}
      style={{fontSize: '100px'}}
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
