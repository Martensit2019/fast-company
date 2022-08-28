import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ status, ...rest }) => {
  return (
    <div className="btn btn-outline-secondary" {...rest}>
      <i className={"bi bi-bookmark" + (status ? "-fill" : "")}></i>
    </div>
  );
};
Bookmark.propTypes = {
  status: PropTypes.bool
};

export default Bookmark;
