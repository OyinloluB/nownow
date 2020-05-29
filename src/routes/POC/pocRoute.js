import React from "react";
import { Switch, Route } from "react-router-dom";

const pocRoute = () => {
  return (
    <Switch>
      <Route path={"/poc/signup"} component={pocSignUp} />
      <Route path={"/poc/signin"} component={pocSignIn} />
    </Switch>
  );
};

export default pocRoute;
