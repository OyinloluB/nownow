import React, { useState } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import RoomIcon from "@material-ui/icons/Room";

import InfoWindowTooltip from "./InfoWindowTooltip";


var MarkerInfoWindow = ({ user }) => {
 
  var [isOpen, setIsOpen] = useState(false);
  
  return (
    <Marker
      position={{ lat: user.latitude, lng: user.longitude }}
      icon = {{url: "http://maps.google.com/mapfiles/ms/icons/"+user.color+".png"}}
        
      onClick={() => setIsOpen(!isOpen)}
      // icon={
      //   user.type === "distributor" ? (
      //     <RoomIcon style={{ color: "green" }} />
      //   ) : user.type === "bulkbreaker" ? (
      //     <RoomIcon color="primary" />
      //   ) : (
      //     <RoomIcon color="secondary" />
      //   )
      // }
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
