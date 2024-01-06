import React, { useState, useEffect } from 'react';

const BooleanField = ({ field_value, field_name, label, onChangeCallback }) => {
    
    const [value, setValue] = useState(field_value);

    const handleChange = (event) => {
        onChangeCallback(field_name, event.target.value);
        setValue(event.target.value);
    }

    useEffect(() => {
        setValue(field_value);
    }, [field_value]);

    return (
        <div className="boolean-field-container col-3 mb-4 form-group">
            <label 
                htmlFor={`dropdown-field-${field_name}`} 
                className="dropdown-field-label mx-2">
                    {label}
            </label>
            <select 
                id={`dropdown-field-${field_name}`}
                name={field_name} 
                className="boolean-field form-control" 
                value={value} 
                onChange={handleChange}
            >
                <option className="dropdown-option" value="">-</option>
                <option className="dropdown-option" value="0">No</option>
                <option className="dropdown-option" value="1">Yes</option>
            </select>
        </div>
    );
}

export default BooleanField;