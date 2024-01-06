import React from "react";

const DropdownField = (props) => {
  
  const getOptions = () => {
    return props.options.map((item, index) => {
      return <option key={index} value={item[props.valueKey]}>{item[props.labelKey]}</option>;
    });
  };

  return (
    <div className="form-group mt-5">
      <label htmlFor={props.name}>{props.label}</label>
      <select
        multiple={props.multiple}
        className="form-control my-2"
        name={props.name}
        value={props.value}
        id={props.id}
        disabled={props.disabled}
        required={props.required}
        onChange={props.changeCallback}
      >
        {getOptions()}
      </select>
      <small className="form-text text-muted">{props.smallText}</small>
    </div>
  );
};

export default DropdownField;
