import React from "react";
import PropTypes from "prop-types";

const GroupeList = ({
  items,
  valueProperty,
  contentProperty,
  onItemSelect,
  selectedItem
}) => {
  return (
    <ul className="list-group">
      {Object.keys(items).map((item) => (
        <li
          className={
            "list-group-item" + (items[item] === selectedItem ? " active" : "")
          }
          key={items[item][valueProperty]}
          onClick={() => onItemSelect(items[item])}
          role="button"
        >
          {items[item][contentProperty]}
        </li>
      ))}
    </ul>
  );
};
GroupeList.defaultProps = {
  valueProperty: "_id",
  contentProperty: "name"
};
GroupeList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func,
  selectedItem: PropTypes.object
};

export default GroupeList;
