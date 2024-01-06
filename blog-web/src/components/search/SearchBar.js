import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import useSearchContext from '../../hooks/use-search-context';

const SearchBar = () => {

  const [query, setQuery] = useState('');

  const [valueChanged, setValueChanged] = useState(false);

  const inputRef = useRef(null);

  const { searchPostsByTitle } = useSearchContext();

  const handleChange = (event) => {
    setQuery(event.target.value);
    setValueChanged(true);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(valueChanged){
      searchPostsByTitle(query);
      setValueChanged(false);
    }
  }

  return (
    <div className="searchbar">
      <form className="searchbar-form" onSubmit={handleSubmit}>
        <input 
          ref={inputRef}
          className="search-field" 
          required="required" 
          placeholder="Search here for posts..." 
          name="search"
          onChange={handleChange}
        />
        <button className="search-button" type="submit">
          <FontAwesomeIcon icon={faSearch}/>
        </button>
      </form>
    </div>
  )
}

export default SearchBar;