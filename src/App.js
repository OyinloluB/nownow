import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./Components/Layout/Navbar";
import distributorRoute from "./routes/Distributor/distributorRoute";
import bulbbreakerRoute from "./routes/BulbBreaker/bulbbreakerRoute";
import pocRoute from "./routes/POC/pocRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/distributor" component={distributorRoute} />
        <Route path="/bulbbreaker" component={bulbbreakerRoute} />
        <Route path="/poc" component={pocRoute} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
