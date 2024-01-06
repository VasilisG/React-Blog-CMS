import React from "react";

const BooleanField = (props) => {
  return (
    <div className="form-group mt-5 form-check form-switch">
      <label htmlFor={props.name}>{props.label}</label>
      <input
        type="checkbox"
        className="form-check-input"
        name={props.name}
        checked={props.value}
        id={props.id}
        disabled={props.disabled || null}
        required={props.required || null}
        onChange={props.changeCallback}
      />
      {props.smallText ? <small className="form-text text-muted">{props.smallText}</small> : null }
    </div>
  );
};

export default BooleanField;
