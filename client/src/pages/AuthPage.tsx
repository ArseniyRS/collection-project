import SignIn from "@c/Auth/SignIn";
import SignUp from "@c/Auth/SignUp";
import React from "react";
import { Route, Switch } from "react-router";
import "../styles/auth.scss";
import '../styles/fields.scss';

const AuthPage = () => {
  return (
    <div className="container auth-page">
      <Switch>
        <Route path="/sign-in">
          <SignIn />
        </Route>
        <Route path="/sign-up">
          <SignUp />
        </Route>
      </Switch>
    </div>
  );
};

export default AuthPage;
