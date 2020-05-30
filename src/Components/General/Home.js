import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Map from "./Map";

const Home = () => {
  const [coordinates, setCoordinates] = useState({
    lat: -34.397,
    lng: 150.644,
  });
  const { loading, pocs } = useSelector((state) => state.map);

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
  return <Map markers={[...pocs]} center={coordinates} />;
};

export default Home;
