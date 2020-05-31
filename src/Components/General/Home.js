import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Map from "./Map";

const Home = () => {
  const [coordinates, setCoordinates] = useState({ lat: 6.532959, lng: 3.364504 });
  const { pocs, distributors, bulkbreakers } = useSelector((state) => state.user);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        // setCoordinates({
        //   lat: position.coords.latitude,
        //   lng: position.coords.longitude,
        // });
      });
    }
  }, []);

  return (
    <Map users={[...pocs, ...distributors, ...bulkbreakers]} center={coordinates} />
  );
};

export default Home;
