import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchBulkbreakersAndDistributors,
  fetchPocsAndBulkbreakers,
  fetchPocsAndDistributors,
} from "./redux/user/user.actions";

import Navbar from "./Components/Layout/Navbar";
import Home from "./Components/General/Home";

import UserInfo from "./Components/AccountForms/User/UserInfo";
import UserSignIn from "./Components/AccountForms/User/UserSignIn";

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

  const userTypes = ["poc", "distributor", "bulkbreaker"];

  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/:user/info"
          render={({ match: { params } }) =>
            userTypes.includes(params.user) ? <UserInfo type={params.user} /> : null
          }
        />
        <Route
          exact
          path="/:user/signin"
          render={({ match: { params } }) =>
            userTypes.includes(params.user) ? (
              <UserSignIn type={params.user} />
            ) : null
          }
        />
      </Switch>
    </>
  );
}

export default App;
