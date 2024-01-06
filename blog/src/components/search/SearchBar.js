import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faAngleUp, faAngleDown, faGlobe, faNewspaper, faComment, faTag } from '@fortawesome/free-solid-svg-icons';
import { TYPE_LOOKUP } from './Constants';

const SearchBar = ({valueCallback, typeCallback, searchCallback}) => {

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [typeIcon, setTypeIcon] = useState('all');

    const updateDropdownVisible = (event) => {
        let id = event.target.id;
        if(id === 'type-selected'){
            setDropdownVisible(!dropdownVisible);
        }
    }

    const handleTypeFromItem = (event) => {
        event.stopPropagation();
        let itemType = event.target.dataset.type;
        setTypeIcon(itemType);
        typeCallback(itemType);
        setDropdownVisible(false);
    }

    const handleInputChange = (event) => {
        event.stopPropagation();
        valueCallback(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        searchCallback();
    }

    useEffect(() => {
        function hideDropdown(event){
            let id = event.target.id;
            if(id !== 'type-selected'){
                setDropdownVisible(false);
            }
        }
        document.body.addEventListener('click', hideDropdown);
        return () => {
            document.body.removeEventListener('click', hideDropdown);
        }
    }, []);

    return (
            <form 
                className="search-bar d-flex shadow-sm"
                onSubmit={handleSubmit}
            >
                <div className="type-selection">
                    <span id="type-selected" className="type-selected" onClick={updateDropdownVisible}>
                        <FontAwesomeIcon icon={dropdownVisible ? faAngleUp : faAngleDown} className="search-type-icon" color="#194282"/>
                        {TYPE_LOOKUP[typeIcon]}
                    </span>
                    <div id="type-selection-dropdown" className={`type-selection-dropdown ${dropdownVisible ? 'type-selection-dropdown-active' : ''} shadow-lg`}>
                        <ul className="type-selection-list list-group list-group-flush">
                            <li className="type-selection-item list-group-item" data-type="all" onClick={handleTypeFromItem}>
                                <FontAwesomeIcon icon={faGlobe} className="search-type-icon" color="#194282"/>All
                            </li>
                            <li className="type-selection-item list-group-item" data-type="post" onClick={handleTypeFromItem}>
                                <FontAwesomeIcon icon={faNewspaper} className="search-type-icon" color="#194282"/>Posts
                            </li>
                            <li className="type-selection-item list-group-item" data-type="comment" onClick={handleTypeFromItem}>
                                <FontAwesomeIcon icon={faComment} className="search-type-icon" color="#194282"/>Comments
                            </li>
                            <li className="type-selection-item list-group-item" data-type="tag" onClick={handleTypeFromItem}>
                                <FontAwesomeIcon icon={faTag} className="search-type-icon" color="#194282"/>Tags
                            </li>
                        </ul>
                    </div>
                </div>
                <input 
                    type="text" 
                    className="search-field" 
                    name="term" 
                    placeholder="Enter search term..." 
                    required="required" 
                    onChange={handleInputChange}
                />
                <button 
                    type="submit" 
                    className="search-submit">
                        <FontAwesomeIcon icon={faSearch} color="#194282" className="search-icon"/>
                </button>
            </form>
    );

}

export default SearchBar;