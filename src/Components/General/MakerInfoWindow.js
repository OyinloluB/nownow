import React, { useState } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import RoomIcon from "@material-ui/icons/Room";

import InfoWindowTooltip from "./InfoWindowTooltip";

const MarkerInfoWindow = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Marker
      position={{ lat: user.latitude, lng: user.longitude }}
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
