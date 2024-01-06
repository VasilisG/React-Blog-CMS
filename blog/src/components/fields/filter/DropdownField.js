import { React, useState, useEffect } from 'react';

const DropdownField = ({ field_name, field_value, label, values, onChangeCallback }) => {

    const [value, setValue] = useState(field_value);

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    useEffect(() => {
        onChangeCallback(field_name, value);
    }, [value]);

    useEffect(() => {
        setValue(field_value);
    }, [field_value]);
    
    return (
        <div className="dropdown-field-container col-3 mb-4 form-group">
            <label 
                htmlFor={`dropdown-field-${field_name}`} 
                className="dropdown-field-label mx-2">
                    {label}
            </label>
            <select 
                id={`dropdown-field-${field_name}`}
                name={field_name} 
                className="dropdown-field form-control" 
                value={value} 
                onChange={handleChange}
            >
                {values.map((elem) => <option className="dropdown-option" key={elem} value={elem}>{elem}</option>)}
            </select>
        </div>
    );
}

export default DropdownField;