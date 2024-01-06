import { React, useState, useEffect } from 'react';
import { PAGE_SIZE, LIMIT_OPTIONS } from './Constants';

const Limiter = ({ value, total, callback }) => {

  const [limit, setLimit] = useState(value || PAGE_SIZE);
  const [totalPosts, setTotalPosts] = useState(total);

  useEffect(() => {
    setTotalPosts(total);
  }, [total]);

  useEffect(() => {
    callback(limit);
  }, [limit]);

  const handleChange = (event) => {
    setLimit(event.target.value);
  }

  const optionItems = LIMIT_OPTIONS.map((option) => {
    return <option 
              label={option} 
              value={option}
              key={option} 
            >
              {option}
            </option>
  });

  return (
    <div className="limiter-container">
        <div className="limiter d-flex align-items-center gap-3">
          <span className="limiter-info d-block">Showing </span>
          <select className="limiter-select" onChange={handleChange} value={limit}>
            {optionItems}
          </select>
          <span className="limiter-info d-block">out of <strong>{totalPosts}</strong> records</span>
        </div>
    </div>
  );

}

export default Limiter;