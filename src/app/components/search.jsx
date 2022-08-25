import React from "react";
import PropTypes from "prop-types";

const Search = ({ value, onSearch }) => {
  return (
    <div className="mb-3 mt-3">
      <input
        className="form-control"
        type="text"
        value={value}
        placeholder="Поиск..."
        onChange={onSearch}
      />
    </div>
  );
};

Search.propTypes = {
  value: PropTypes.string,
  onSearch: PropTypes.func
};

export default Search;
