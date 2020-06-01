import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchBulkbreakersAndDistributors,
  fetchPocsAndBulkbreakers,
  fetchPocsAndDistributors,
} from "./redux/user/user.actions";

import Navbar from "./Components/Layout/Navbar";
import distributorRoute from "./routes/Distributor/distributorRoute";
import bulbbreakerRoute from "./routes/BulbBreaker/bulbbreakerRoute";
import pocRoute from "./routes/POC/pocRoute";
import Home from "./Components/General/Home";

function App() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      if (user.type === "poc") {
        dispatch(fetchBulkbreakersAndDistributors());
      } else if (user.type === "distributor") {
        dispatch(fetchPocsAndBulkbreakers());
      } else if (user.type === "bulkbreaker") {
        dispatch(fetchPocsAndDistributors());
      }
    }
  }, [isAuthenticated, user, dispatch]);

  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/distributor" component={distributorRoute} />
        <Route path="/bulkbreaker" component={bulbbreakerRoute} />
        <Route path="/poc" component={pocRoute} />
      </Switch>
    </>
  );
}

export default App;
