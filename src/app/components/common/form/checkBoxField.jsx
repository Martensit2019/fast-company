import React from "react";
import PropTypes from "prop-types";

const CheckBoxField = ({ name, value, onChange, children }) => {
  const handleChange = () => {
    console.log("bfd");
    onChange({ name, value: !value });
  };

  return (
    <div className="form-check mb-4">
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        id={name}
        onChange={handleChange}
      />
      <label className="form-check-label" htmlFor={name} defaultChecked={value}>
      {/* <label className="form-check-label" htmlFor={name} checked={value}> */}
        {children}
      </label>
    </div>
  );
};

CheckBoxField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default CheckBoxField;
