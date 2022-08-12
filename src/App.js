import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./app/layouts/login";
import Main from "./app/layouts/main";
import Users from "./app/layouts/users";
import Navbar from "./app/components/navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/users/:userId?" component={Users} />
        <Route path="/login" component={Login} />
        <Route path="/" exact component={Main} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default App;
