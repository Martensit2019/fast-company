import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./app/components/navbar";
import Login from "./app/layouts/login";
import Users from "./app/layouts/users";
// import Users from "./app/components/usersList";
import Main from "./app/layouts/main";

const App = () => {
  // return <Users />;
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/users/:userId?" component={Users} />
      </Switch>
    </div>
  );
};

export default App;
