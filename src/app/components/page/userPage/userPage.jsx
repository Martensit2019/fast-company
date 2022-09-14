import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";

const UserPage = ({ id }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    api.users.getById(id).then((data) => setUser(data));
  }, []);

  if (!user) {
    return "Loading...";
  }
  return (
    <div className="container">
      <div className="row gutters-sm">
        <div className="col-md-4 mb-3">
          <UserCard user={user} />
          <QualitiesCard data={user.qualities} />
          <MeetingsCard value={user.completedMeetings} />
        </div>
        <div className="col-md-8">
          <Comments />
        </div>
      </div>
    </div>
  );
};

UserPage.propTypes = {
  id: PropTypes.string.isRequired
};

export default UserPage;
