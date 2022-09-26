import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const Quality = ({ id }) => {
  const { getQuality } = useQualities();
  const { color, name } = getQuality(id);
  const getBadgeClasses = (color) => {
    return "badge m-1 bg-" + color;
  };
  return <span className={getBadgeClasses(color)}>{name}</span>;
};

Quality.propTypes = {
  id: PropTypes.string.isRequired
};

export default Quality;
