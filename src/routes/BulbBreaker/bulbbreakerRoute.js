import React from "react";
import { Switch, Route } from "react-router-dom";
import { BulbbreakerSignUp } from "../../Components/AccountForms/Bulbbreakers/BulbbreakerSignUp";
import { BulbbreakerSignIn } from "../../Components/AccountForms/Bulbbreakers/BulbbreakerSignIn";

const bulbbreakerRoute = () => {
  return (
    <Switch>
      <Route path={"/bulkbreaker/signup"} component={BulbbreakerSignUp} />
      <Route path={"/bulkbreaker/signin"} component={BulbbreakerSignIn} />
    </Switch>
  );
};

export default bulbbreakerRoute;
