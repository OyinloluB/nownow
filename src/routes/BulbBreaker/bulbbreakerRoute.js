import React from "react";
import { Switch, Route } from "react-router-dom";

const bulbbreakerRoute = () => {
  return (
    <Switch>
      <Route path={"/bulbbreaker/signup"} component={bulbbreakerSignUp} />
      <Route path={"/bulbbreaker/signin"} component={bulbbreakerSignIn} />
    </Switch>
  );
};

export default bulbbreakerRoute;
