import React from "react";

const TextField = (props) => {

  return (
    <div className="form-group mt-5">
      <label htmlFor={props.name}>{props.label}</label>
      <input
        type="text"
        className="form-control my-2"
        name={props.name ?? ''}
        value={props.value ?? ''}
        id={props.id}
        disabled={props.disabled || null}
        required={props.required || null}
        onChange={(e) => props.changeCallback(e)}
      />
      {props.smallText ? <small className="form-text text-muted">{props.smallText}</small> : null }
    </div>
    
  );
};

export default TextField;