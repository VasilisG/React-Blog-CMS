import React, { useEffect, useState } from 'react';
import { formatDatetime } from '../../../utils/dateFormatter';

const Datetime = () => {

  const [datetime, setDatetime] = useState(new Date());

  useEffect(() => {
    const intervalID = setInterval(() => {
      setDatetime(new Date())
    }, 1000);
    return () => {
      clearInterval(intervalID);
    }
  }, []);

  return (
    <div className="date-container">
      <span className="datetime">{formatDatetime(datetime)}</span>
    </div>
  );
}

export default Datetime;