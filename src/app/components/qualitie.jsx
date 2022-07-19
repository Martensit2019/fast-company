import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ color, name }) => {
  const getBadgeClasses = (color) => {
    return "badge m-1 bg-" + color;
  };
  return <span className={getBadgeClasses(color)}>{name}</span>;
};

Qualitie.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default Qualitie;
