import React, {useEffect} from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./Components/Layout/Navbar";
import distributorRoute from "./routes/Distributor/distributorRoute";
import bulbbreakerRoute from "./routes/BulbBreaker/bulbbreakerRoute";
import pocRoute from "./routes/POC/pocRoute";

function App() {
  useEffect(() => {
      if(navigator.geolocation){
        navigator.geolocation.watchPosition(function(position) {
          console.log("Latitude is :", position.coords.latitude);
          console.log("Longitude is :", position.coords.longitude);
        });
      }
  }, []);

  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/distributor" component={distributorRoute} />
        <Route path="/bulbbreaker" component={bulbbreakerRoute} />
        <Route path="/poc" component={pocRoute} />
      </Switch>
    </>
  );
}

export default App;
