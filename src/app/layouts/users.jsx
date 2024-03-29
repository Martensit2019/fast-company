import React from "react";
import { useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import EditUserPage from "../components/page/editUserPage/editUserPage";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import UsersLoader from "../components/ui/hoc/usersLoader";
import { getCurrentUserId } from "../store/users";

const Users = () => {
  const { userId, edit } = useParams();
  const currentUserId = useSelector(getCurrentUserId());

  return (
    <>
      <UsersLoader>
          {userId ? (
            edit ? (
              userId === currentUserId ? (
                <EditUserPage />
              ) : (
                <Redirect to={`/users/${currentUserId}/edit`} />
              )
            ) : (
              <UserPage id={userId} />
            )
          ) : (
            <UsersListPage />
          )}
      </UsersLoader>
    </>
  );
};

export default Users;
