import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
  const handleSort = (item) => {
    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === "asc" ? "desc" : "asc"
      });
    } else {
      onSort({ path: item, order: "asc" });
    }
  };
  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            scope="col"
            onClick={
              columns[column].path
                ? () => handleSort(columns[column].path)
                : undefined
            }
            {...{ role: columns[column].path && "button" }}
          >
            {columns[column].name}
          </th>
        ))}
        {/* <th scope="col" onClick={() => handleSort("name")}>
          Имя
        </th>
        <th scope="col">Качества</th>
        <th scope="col" onClick={() => handleSort("profession.name")}>
          Профессия
        </th>
        <th scope="col" onClick={() => handleSort("completedMeetings")}>
          Встретился, раз
        </th>
        <th scope="col" onClick={() => handleSort("rate")}>
          Оценка
        </th>
        <th scope="col" onClick={() => handleSort("bookmark")}>
          Избранное
        </th>
        <th /> */}
      </tr>
    </thead>
  );
};
TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired
};

export default TableHeader;
