import React from 'react';
import HeaderActions from './HeaderActions';
import Search from './Search';
import { Provider } from '../../context/search';

const Header = () => {
    return (
        <header className="admin-header d-flex align-items-center mb-4">
            <Provider>
                <Search/>
            </Provider>
            <HeaderActions/>
        </header>
    );
};

export default Header;