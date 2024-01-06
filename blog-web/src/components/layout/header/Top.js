import React from 'react';
import Datetime from './Datetime';
import Logo from './Logo';
import Search from '../../search/Search';

const Top = () => {
  return (
    <div className="header-top-container">
      <Datetime/>
      <Logo/>
      <Search/>
    </div>
  );
}

export default Top;