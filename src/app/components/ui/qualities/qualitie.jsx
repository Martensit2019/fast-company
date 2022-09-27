import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const Qualitie = ({ id }) => {
  const { getQuality } = useQualities();
  const { color, name } = getQuality(id);
  const getBadgeClasses = (color) => {
    return "badge m-1 bg-" + color;
  };
  return <span className={getBadgeClasses(color)}>{name}</span>;
};

Qualitie.propTypes = {
  id: PropTypes.string.isRequired
};

export default Qualitie;
