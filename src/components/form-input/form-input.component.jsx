import React from "react";

import "./form-input.styles.scss";

const FormInput = ({ handleChange, label, name, value, type }) => (
  <div className="group">
    <input
      className="form-input"
      type={type}
      name={name}
      value={value}
      onChange={handleChange}
      required
    />
    {label ? (
      <label className={`${value.length ? "shrink" : ""} form-input-label`}>
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInput;
