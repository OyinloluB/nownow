import React from "react";
import { Switch, Route } from "react-router-dom";
import BulkbreakerSignUp from "../../Components/AccountForms/Bulkbreakers/BulkbreakerSignUp";
import BulkbreakerSignIn from "../../Components/AccountForms/Bulkbreakers/BulkbreakerSignIn";

const bulbbreakerRoute = () => {
  return (
    <Switch>
      <Route path={"/bulkbreaker/signup"} component={BulkbreakerSignUp} />
      <Route path={"/bulkbreaker/signin"} component={BulkbreakerSignIn} />
    </Switch>
  );
};

export default bulbbreakerRoute;
