import React from "react";
import { Switch, Route } from "react-router-dom";
import { PocSignUp } from "../../Components/AccountForms/POCs/pocSignUp";
import { PocSignIn } from "../../Components/AccountForms/POCs/pocSignIn";

const pocRoute = () => {
  return (
    <Switch>
      <Route path={"/poc/signup"} component={PocSignUp} />
      <Route path={"/poc/signin"} component={PocSignIn} />
    </Switch>
  );
};

export default pocRoute;
