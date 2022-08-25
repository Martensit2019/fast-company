import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import api from "../api";
import PropTypes from "prop-types";
import GroupeList from "./groupList";
import SearchStatus from "./searchStatus";
import UserTable from "./usersTable";
import _ from "lodash";
import Search from "./search";

const UsersList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
  const [searchValue, setSearchValue] = useState("");

  const pageSize = 8;

  // ------------
  // ------------
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
  // ------------
  // ------------

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
    setSearchValue("");
  };

  const handlePageChange = (pageIdx) => {
    setCurrentPage(pageIdx);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  const handleSearch = ({ target }) => {
    setSelectedProf();
    setSearchValue(target.value);
  };

  if (users) {
    const filteredUsers = selectedProf
      ? users.filter(
        (user) =>
          JSON.stringify(user.profession) === JSON.stringify(selectedProf)
      )
      : users;
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const searchedUsers = searchValue
      ? sortedUsers.filter((user) =>
        user.name.toLowerCase().includes(searchValue.toLowerCase())
      )
      : sortedUsers;
    const usersCrop = paginate(searchedUsers, currentPage, pageSize);
    const clearFilter = () => {
      setSelectedProf();
    };

    return (
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupeList
              selectedItem={selectedProf}
              items={professions}
              onItemSelect={handleProfessionSelect}
            />
            <button className="btn btn-secondary mt-2" onClick={clearFilter}>
              Очистить
            </button>
          </div>
        )}
        <div style={{ minWidth: "calc(100% - 142px)" }}>
          <SearchStatus length={count} />
          <Search value={searchValue} onSearch={handleSearch} />
          {count > 0 && (
            <UserTable
              users={usersCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              onDelete={handleDelete}
              onToggleBookMark={handleToggleBookMark}
            />
          )}
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
  return "loading...";
};

UsersList.propTypes = {
  users: PropTypes.array
};

export default UsersList;
