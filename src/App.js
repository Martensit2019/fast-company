import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./app/layouts/login";
import Main from "./app/layouts/main";
import Users from "./app/layouts/users";
import Navbar from "./app/components/ui/navbar";
import ProtectedRoute from "./app/components/common/protectedRoute";
import LogOut from "./app/layouts/logOut";
import AppLoader from "./app/components/ui/hoc/appLoader";

const App = () => {
  return (
    <div>
      <AppLoader>
        <Navbar />
        <Switch>
          <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
          <Route path="/login/:type?" component={Login} />
          <Route path="/logout" component={LogOut} />
          <Route path="/" exact component={Main} />
          <Redirect to="/" />
        </Switch>
      </AppLoader>
      <ToastContainer />
    </div>
  );
};

export default App;
