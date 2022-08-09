import React from "react";
import { useParams } from "react-router-dom";
import UserItem from "../components/userItem";
import UserList from "../components/usersList";

const Users = () => {
  const { userId } = useParams();
  return userId ? <UserItem id={userId} /> : <UserList />;
};

export default Users;
