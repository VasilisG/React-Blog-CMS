import { React, useState } from 'react';
import SearchBar from '../search/SearchBar';
import SearchResults from '../search/SearchResults';
import { TAB_HEADERS } from '../search/Constants';
import useSearchContext from '../../hooks/use-search-context';
import API from '../../utils/api';

const Search = () => {

    const [data, setData] = useState({
        posts: [],
        comments: [],
        tags: []
    });
    const [value, setValue] = useState('');
    const [type, setType] = useState('all');

    const { setTabsVisible } = useSearchContext();

    const fetchSearchResults = async () => {
        const response = await API.get(`quicksearch?q=${value}&type=${type}`);
        const results = response.data;
        setData({
            posts: results.data.posts,
            comments: results.data.comments,
            tags: results.data.tags
        });
        setTabsVisible(true);
    }

    return (
        <div className="search-bar-container col-9 d-flex justify-content-end">
            <div className="search-bar-inner-container">
                <SearchBar
                    valueCallback={setValue}
                    typeCallback={setType}
                    searchCallback={fetchSearchResults}
                />
                <SearchResults
                    headers={TAB_HEADERS}
                    data={data}
                />
            </div>
        </div>
    );

}

export default Search;