import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./app/layouts/login";
import Main from "./app/layouts/main";
import Users from "./app/layouts/users";
import Navbar from "./app/components/ui/navbar";
import AuthProvider from "./app/hooks/useAuth";
import ProtectedRoute from "./app/components/common/protectedRoute";
import LogOut from "./app/layouts/logOut";
import { useDispatch } from "react-redux";
import { loadQualitiesList } from "./app/store/qualities";
import { loadProfessionsList } from "./app/store/professions";
import { loadUsersList } from "./app/store/users";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadProfessionsList());
    dispatch(loadQualitiesList());
    dispatch(loadUsersList());
  }, []);
  return (
    <div>
      <AuthProvider>
        <Navbar />
        <Switch>
          <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
          <Route path="/login/:type?" component={Login} />
          <Route path="/logout" component={LogOut} />
          <Route path="/" exact component={Main} />
          <Redirect to="/" />
        </Switch>
      </AuthProvider>
      <ToastContainer />
    </div>
  );
};

export default App;
