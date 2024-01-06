import React from 'react';
import TabbedPane from '../tabs/TabbedPane';

const SearchResults = ({headers, data}) => {
  
  return (
    <TabbedPane 
      headers={headers} 
      data={data}
    />
  );
}

export default SearchResults;