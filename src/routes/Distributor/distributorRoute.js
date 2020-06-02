import React from "react";
import { Switch, Route } from "react-router-dom";
import DistributorInfo from "../../Components/AccountForms/Distributors/DistributorInfo";
import { DistributorSignIn } from "../../Components/AccountForms/Distributors/DistributorSignIn";

const distributorRoute = () => {
  return (
    <Switch>
      <Route path={"/distributor/signup"} component={DistributorInfo} />
      <Route path={"/distributor/signin"} component={DistributorSignIn} />
    </Switch>
  );
};

export default distributorRoute;
