import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ _id, color, name }) => {
  const getBadgeClasses = (color) => {
    return "badge m-1 bg-" + color;
  };
  return <span className={getBadgeClasses(color)}>{name}</span>;
};

Qualitie.propTypes = {
  _id: PropTypes.string.isRequired,
  color: PropTypes.string,
  name: PropTypes.string
};

export default Qualitie;
