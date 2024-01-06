import React, { useRef } from 'react';
import MenuItem from './menu-item/MenuItem';
import ToggleButton from './toggle-button/ToggleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const MobileMenu = ({ data, toggleCallback }) => {

  const menuRef = useRef(null);

  const handleToggle = () => {
    menuRef.current.classList.toggle('mobile-active');
    if(menuRef.current.classList.contains('mobile-active')){
      toggleCallback(true);
    }
    else toggleCallback(false);
  }

  return (
    <>
      <ToggleButton clickCallback={handleToggle}/>
      <ul ref={menuRef} className="top-menu mobile">
        <li className={`menu-item toggle-button-inside level-0`} onClick={handleToggle}>
          <span className="top-back menu-back-toggle"><FontAwesomeIcon icon={faXmark} /></span>
        </li>
        {
          data.map(topItem => {
            return <MenuItem key={topItem._id} item={topItem} level={0} mobile={true} currentPath='/category/'/>
          })
        }
      </ul>
    </>
  )
}

export default MobileMenu;