import { React, useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMultiply } from '@fortawesome/free-solid-svg-icons';

const ImageField = (props) => {

  const fileElement = useRef();

  const [image, setImage] = useState(props.imageValue);

  const imageExists = (img) => {
    return  img !== undefined 
         && img !== null; 
         //&& img !== '';
  }

  const imagePreview = () => {
    return imageExists(image) && image !== '' ? 
    <div className="image-preview">
      <img src={image} alt="Preview"/>
    </div> : ''; 
  }

  const handleChange = (event) => {
    props.changeCallback(event);
    if(event.target.files[0]){
      const imgSrc = URL.createObjectURL(event.target.files[0]);
      setImage(imgSrc);
    }
  }

  const handleRemove = (event) => {
    if(image){
      props.changeCallback(event);
      fileElement.current.value = null;
      setImage('');
    }
  }

  useEffect(() => {
    if(imageExists(props.imageValue) && typeof props.imageValue != 'object'){
      setImage(props.imageValue);
    }
  }, [props.imageValue]);

  return (
    <div className="form-group mt-5">
      <label htmlFor={props.name}>{props.label}</label>
      <div className="file-field-wrapper d-flex align-items-center">
          <div className="file-field-container">
            <input
              type="file"
              className="form-control my-2 image-file-field"
              name={props.name}
              id={props.id}
              accept="image/png, image/jpeg"
              disabled={props.disabled}
              required={props.required}
              value={imageExists() ? image : ''}
              onChange={handleChange}
              ref={fileElement}
            />
          </div>
          <div className="file-actions-container ms-2">
            <button 
              type="button" 
              className="remove-image-button btn btn-outline-danger" 
              onClick={handleRemove}
            >
              <FontAwesomeIcon icon={faMultiply} className="remove-image-icon"/>
            </button>
          </div>       
      </div>
      <small className="form-text text-muted">{props.smallText}</small>
      {imagePreview()}
    </div>
  );
};

export default ImageField;
