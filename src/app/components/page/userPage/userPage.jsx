import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import Qualities from "../../ui/qualities";
import { useHistory } from "react-router-dom";

const UserPage = ({ id }) => {
  const history = useHistory();
  const [user, setUser] = useState();
  useEffect(() => {
    api.users.getById(id).then((res) => setUser(res));
  });
  const handleСlick = () => {
    history.push("/users");
  };
  if (!user) {
    return "Loading...";
  }
  return (
    <>
      <h1>
        <strong>Имя:</strong> {user.name}
      </h1>
      <h2>
        <strong>Профессия:</strong> {user.profession?.name}
      </h2>
      <h2>
        <strong>Качества:</strong> <Qualities qualities={user.qualities} />
      </h2>
      <h2>
        <strong>Встретился:</strong> {user.completedMeetings} раз
      </h2>
      <h2>
        <strong>Оценка:</strong> {user.rate}
      </h2>
      {/* ------------------
      моя кнопка
      <Link to="/users">
      <button>Все пользователи</button>
      </Link>
      ----------------- */}
      <button className="btn bg-primary" onClick={handleСlick}>
        Все пользователи
      </button>
    </>
  );
};

UserPage.propTypes = {
  id: PropTypes.string.isRequired
};

export default UserPage;
