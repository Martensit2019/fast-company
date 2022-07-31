import React, { useState, useEffect } from "react";
import Users from "./app/components/users";
import api from "./app/api";

const App = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);
  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };
  const handleToggleBookMark = (id) => {
    setUsers(
      // --------------------------------------------
      // моё решение
      // --------------------------------------------
      users.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark };
        }
        return user;
      })
      // --------------------------------------------
      // ------------------------------------------
      // решение из видео, но мне непонятно
      // ------------------------------------------
      // users.filter((user) => {
      //   if (user._id === id) {
      //     user.bookmark = !user.bookmark;
      //     return user;
      //   }
      //   return user;
      // })
      // -------------------------------------------
    );
  };

  return (
    <div>
      {users !== undefined && (
        <Users
          users={users}
          onDelete={handleDelete}
          onToggleBookMark={handleToggleBookMark}
        />
      )}
    </div>
  );
};

export default App;
