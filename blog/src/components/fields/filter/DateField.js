import { React, useState, useEffect } from 'react';

const DateField = ({ field_name, field_value, label, minDate, onChangeCallback }) => {

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

    const getCurrentDate = () => {
        let currentDate = new Date();
        return `${currentDate.getFullYear}-${currentDate.getMonth}-${currentDate.getDay}`;
    }

    return (
        <div className="date-field-container col-3 mb-4 form-group">
            <label 
                htmlFor={`date-field-${field_name}`} 
                className="date-field-label mx-2">
                    {label}
            </label>
            <input 
                type="date" 
                name={field_name} 
                className="form-control" 
                min={minDate} 
                max={getCurrentDate()} 
                value={value}
                onChange={handleChange}
            />
        </div>
    )
}

export default DateField;