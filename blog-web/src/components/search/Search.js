import React from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import { SearchProvider } from '../../context/search';

const Search = () => {
  return (
    <SearchProvider>
      <div className="search-container">
        <SearchBar/>
        <SearchResults/>
      </div>
    </SearchProvider>
  );
}

export default Search;