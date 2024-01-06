import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const ToggleButton = ({ clickCallback }) => {

  const handleClick = () => {
    clickCallback();
  }

  return (
    <button className="menu-toggle" onClick={handleClick}>
      <FontAwesomeIcon icon={faBars} />
    </button>
  );
}

export default ToggleButton;