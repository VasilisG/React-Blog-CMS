import React from 'react';

const TabHeader = ({value, title, data, active, callback}) => {

  return (
    <p 
      className={`tab-header ${active ? 'tab-active-header' : ''}`}
      onClick={() => callback(value)}
    >
      {`${title} (${data.length})`}
    </p>
  );

}

export default TabHeader;