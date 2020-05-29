import React from "react";
import { Switch, Route } from "react-router-dom";

const distributorRoute = () => {
  return (
    <Switch>
      <Route path={"/distributor/signup"} component={distributorSignUp} />
      <Route path={"/distributor/signin"} component={distributorSignIn} />
    </Switch>
  );
};

export default distributorRoute;
