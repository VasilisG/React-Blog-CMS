import React from 'react';
import Menu from '../../menu/Menu';
import Top from './Top';

const Header = ({ menu }) => {

  return (
    <header className="blog-header">
      <Top/>
      <Menu data={menu}/>
    </header>
  );
}

export default Header;