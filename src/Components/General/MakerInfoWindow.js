import React, { useState } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";

import InfoWindowTooltip from "./InfoWindowTooltip";


var MarkerInfoWindow = ({ user }) => {
 
  var [isOpen, setIsOpen] = useState(false);
  
  // checking ifuser type to specify marker
  return (
    <Marker
      position={{ lat: user.latitude, lng: user.longitude }}
      icon = {{url: "http://maps.google.com/mapfiles/ms/icons/"+user.type+".png"}}
        
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
