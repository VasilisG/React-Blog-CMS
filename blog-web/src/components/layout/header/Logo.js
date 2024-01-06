import React from 'react';
import placeholder from '../../../assets/react-logo.png';

const Logo = () => {

  return (
    <div className="logo-container">
      <img className="logo" src={placeholder} alt="Blog Site"/>
    </div>
  );
}

export default Logo;