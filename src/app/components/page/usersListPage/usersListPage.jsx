import React, { useState, useEffect } from "react";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import PropTypes from "prop-types";
import GroupeList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/usersTable";
import _ from "lodash";
import { useSelector } from "react-redux";
import {
  getProfessions,
  getProfessionsLoadingStatus
} from "../../../store/professions";
import { getCurrentUserId, getUsersList } from "../../../store/users";

const UsersListPage = () => {
  const users = useSelector(getUsersList());
  const currentUserId = useSelector(getCurrentUserId());
  const professions = useSelector(getProfessions());
  const professionsLoading = useSelector(getProfessionsLoadingStatus());
  const [currentPage, setCurrentPage] = useState(1);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
  const pageSize = 8;

  const handleDelete = (userId) => {
    // setUsers(users.filter((user) => user._id !== userId));
    console.log(userId);
  };
  const handleToggleBookMark = (id) => {
    // setUsers(
    // --------------------------------------------
    // моё решение
    // --------------------------------------------
    // users.map((user) => {
    //   if (user._id === id) {
    //     return { ...user, bookmark: !user.bookmark };
    //   }
    //   return user;
    // })
    // --------------------------------------------
    // ------------------------------------------
    // решение из видео, но мне непонятно
    // ------------------------------------------
    const newArray = users.filter((user) => {
      if (user._id === id) {
        user.bookmark = !user.bookmark;
        return user;
      }
      return user;
    });
    console.log(newArray);
  };
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf, searchQuery]);

  const handleProfessionSelect = (item) => {
    if (searchQuery !== "") setSearchQuery("");
    setSelectedProf(item);
  };

  const handleSearchQuery = ({ target }) => {
    setSelectedProf(undefined);
    setSearchQuery(target.value);
  };

  const handlePageChange = (pageIdx) => {
    setCurrentPage(pageIdx);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  if (users) {
    function filterUsers(data) {
      const filteredUsers = searchQuery
        ? data.filter(
            (user) =>
              user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
          )
        : selectedProf
        ? data.filter(
            (user) =>
              JSON.stringify(user.profession) === JSON.stringify(selectedProf)
          )
        : data;
      return filteredUsers.filter((u) => u._id !== currentUserId);
    }
    const filteredUsers = filterUsers(users);
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const usersCrop = paginate(sortedUsers, currentPage, pageSize);
    const clearFilter = () => {
      setSelectedProf();
    };

    return (
      <div className="d-flex">
        {professions && !professionsLoading && (
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
          <div className="mt-3 mb-3">
            <input
              type="text"
              name="searchQuery"
              style={{ width: "100%" }}
              placeholder="Поиск..."
              value={searchQuery}
              onChange={handleSearchQuery}
            />
          </div>

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

UsersListPage.propTypes = {
  users: PropTypes.array
};

export default UsersListPage;
