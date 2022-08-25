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
    renderSortIcon(item);
  };

  const renderSortIcon = (col) => {
    if (selectedSort.path === col) {
      return selectedSort.order === "asc"
        ? <span style={{ paddingLeft: "10px" }}><i className="bi bi-sort-down-alt"></i></span>
        : <span style={{ paddingLeft: "10px" }}><i className="bi bi-sort-down"></i></span>;
    }
    return null;
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
            {columns[column].path && renderSortIcon(columns[column].path)}
          </th>
        ))}
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
