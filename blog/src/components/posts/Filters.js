import { React, useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import TextField from "../fields/filter/TextField";
import DateField from "../fields/filter/DateField";
import BooleanField from "../fields/filter/BooleanField";
import { FILTER_INITIAL_STATE } from "./Constants";

const Filters = ({ activeFilters, callback }) => {

  const { filters } = useSelector((state) => {
    return state.posts;
  });

  const [filterValues, setFilterValues] = useState(filters);

  useEffect(() => {
    setFilterValues(filters);
  }, [filters]);

  const updateFilterValues = (key, value) => {
    setFilterValues({
      ...filterValues,
      [key]: value
    });
  }

  const handleReset = () => {
    setFilterValues(FILTER_INITIAL_STATE);
    callback(FILTER_INITIAL_STATE);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    callback(filterValues);
  };

  return (
    <div
      className={`post-filters-container ${
        activeFilters ? "filters-active" : ""
      }`}
    >
      <hr></hr>
      <form className="post-filters-form" onSubmit={handleSubmit} autoComplete="off">
        <div className="post-filters-form-inner row">
          <TextField 
            label="ID" 
            field_name="id"
            field_value={filterValues.id}
            onChangeCallback={updateFilterValues}
          />
          <TextField 
            label="Title" 
            field_name="title"
            field_value={filterValues.title}
            onChangeCallback={updateFilterValues}
          />
          <DateField
            label="From Date"
            field_name="creation_from"
            minDate="2022-01-01"
            field_value={filterValues.creation_from}
            onChangeCallback={updateFilterValues}
          />
          <DateField
            label="To Date"
            field_name="creation_to"
            minDate="2022-01-01"
            field_value={filterValues.creation_to}
            onChangeCallback={updateFilterValues}
          />
          <BooleanField 
            label="Enabled" 
            field_name="enabled" 
            field_value={filterValues.enabled}
            onChangeCallback={updateFilterValues} 
          />
        </div>
        <div className="post-filters-submit-container d-flex justify-content-end">
          <button 
            className="post-filters-submit-button btn" 
            type="submit"
          >
            Apply Filters
          </button>
          <button 
            className="post-filters-clear-button btn ms-2" 
            type="button"
            onClick={handleReset}
          >
            Clear Filters
          </button>
        </div>
      </form>
      <hr></hr>
    </div>
  );
};

export default Filters;
