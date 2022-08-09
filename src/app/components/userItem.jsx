import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../api";
import { Link } from "react-router-dom";
import Qualitie from "./qualitie";

const UserItem = ({ id }) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    api.users.getById(id).then((data) => {
      console.log(data);
      setUser(data);
    });
  }, []);
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
        <strong>Качества:</strong>{" "}
        {user.qualities?.map((quality) => (
          <Qualitie
            key={quality._id}
            color={quality.color}
            name={quality.name}
          />
        ))}
      </h2>
      <h2>
        <strong>Встретился, раз:</strong> {user.completedMeetings}
      </h2>
      <h2>
        <strong>Оценка:</strong> {user.rate}
      </h2>
      <Link to="/users">
        <button>Все пользователи</button>
      </Link>
    </>
  );
};

UserItem.propTypes = {
  id: PropTypes.string.isRequired
};

export default UserItem;
