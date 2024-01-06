import React from "react";

const TextAreaField = (props) => {
  return (
    <div className="form-group mt-5">
      <label htmlFor={props.name}>{props.label}</label>
      <textarea
        className="form-control my-2"
        name={props.name}
        value={props.value}
        id={props.id}
        disabled={props.disabled}
        required={props.required}
        onChange={props.changeCallback}
      />
      <small className="form-text text-muted">{props.smallText}</small>
    </div>
  );
};

export default TextAreaField;
