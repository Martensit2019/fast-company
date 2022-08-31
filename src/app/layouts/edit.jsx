import React, { useState, useEffect } from "react";
import api from "../api";
// import Qualities from "../../ui/qualities";
import { useParams } from "react-router-dom";
import EditForm from "../components/ui/editForm";

const Edit = () => {
  const { userId } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    api.users.getById(userId).then((res) => setUser(res));
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {user ? <EditForm user={user} /> : "Loading..."}
        </div>
      </div>
    </div>
  );
};

export default Edit;
