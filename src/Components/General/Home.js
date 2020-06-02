import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Map from "./Map";

const Home = () => {
  const [coordinates, setCoordinates] = useState({
    lat: 6.591511,
    lng: 3.490115,
  });

  const { isAuthenticated } = useSelector((state) => state.auth);
  const { pocs, distributors, bulkbreakers } = useSelector(
    (state) => state.user
  );

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

    <div>
      <Map
      users={isAuthenticated ? [...pocs, ...distributors, ...bulkbreakers] : []}
      center={coordinates}
      />

    </div>

  

  );
  
};

export default Home;
