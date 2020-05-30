import React from "react";
import { Switch, Route } from "react-router-dom";
import { DistributorSignUp } from "../../Components/AccountForms/Distributors/DistributorSignUp";
import { DistributorSignIn } from "../../Components/AccountForms/Distributors/DistributorSignIn";

const distributorRoute = () => {
  return (
    <Switch>
      <Route path={"/distributor/signup"} component={DistributorSignUp} />
      <Route path={"/distributor/signin"} component={DistributorSignIn} />
    </Switch>
  );
};

export default distributorRoute;
