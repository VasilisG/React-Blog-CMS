import React, { useEffect, useState } from 'react';

const TextField = ({ field_name, label, field_value, onChangeCallback }) => {

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
        <div className="text-field-container col-3 mb-4 form-group">
            <label 
                htmlFor={`input-post-${field_name}`} 
                className="text-field-label mx-2">{label}
            </label>
            <input 
                type="text" 
                id={`input-post-${field_name}`} 
                name={field_name} 
                className="input-text-field form-control" 
                value={value} 
                onChange={handleChange}
            />
        </div>
    );
}

export default TextField;