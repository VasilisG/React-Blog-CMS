import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditorField = (props) => {

  return <div className="form-group mt-5">
          <label>{props.label}</label>
          <ReactQuill
            theme="snow"
            className="my-2" 
            modules={props.modules} 
            placeholder={props.placeholder}
            onChange={(e) => props.changeCallback(e)}
            value={props.value}
          />
          {props.smallText ? <small className="form-text text-muted">{props.smallText}</small> : null }
        </div>
}

export default EditorField;