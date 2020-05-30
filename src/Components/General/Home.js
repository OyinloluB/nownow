import React, { useState, useEffect } from "react";
import Map from "./Map";

const Home = () => {
  const [coordinates, setCoordinates] = useState({
    lat: -34.397,
    lng: 150.644,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        setCoordinates({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);
  return <Map center={coordinates} />;
};

export default Home;
