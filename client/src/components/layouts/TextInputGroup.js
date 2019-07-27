import React from "react";
import classnames from "classnames";

export default function TextInputGroup({
  label,
  name,
  placeholder,
  type,
  onChange,
  value,
  errors
}) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        className={classnames("form-control form-contol-lg", {
          "is-invalid": errors
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {errors && <div className="invalid-feedback">{errors}</div>}
    </div>
  );
}
