import React from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./Components/Layout/Navbar";
import distributorRoute from "./routes/Distributor/distributorRoute";
import bulbbreakerRoute from "./routes/BulbBreaker/bulbbreakerRoute";
import pocRoute from "./routes/POC/pocRoute";
import Home from "./Components/General/Home";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/distributor" component={distributorRoute} />
        <Route path="/bulbbreaker" component={bulbbreakerRoute} />
        <Route path="/poc" component={pocRoute} />
      </Switch>
    </>
  );
}

export default App;
