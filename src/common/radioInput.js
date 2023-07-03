import React from "react";

function RadioInput({ name, formik, radioOptions }) {
  return (
    <div className="formControl ">
      <label>{name.charAt(0).toUpperCase() + name.slice(1)}</label>
      <div className="radio">
        {radioOptions.map((item) => (
          <React.Fragment key={item.value}>
            <input
              type="radio"
              id={item.value}
              name={name}
              value={item.value}
              onChange={formik.handleChange}
              checked={formik.values[name] === item.value}
            />
            <label htmlFor={item.value}>{item.label}</label>
          </React.Fragment>
        ))}
        {formik.errors[name] && formik.touched[name] && (
          <div className="error"> {formik.errors[name]}</div>
        )}
      </div>
    </div>
  );
}

export default RadioInput;