import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const MenuItem = ({ item, level, mobile, currentPath }) => {

  const [submenuVisible, setSubmenuVisible] = useState(false);

  const submenuRef = useRef(null);

  const handleOnMouseEnter = () => {
    if(!mobile) setSubmenuVisible(true);
  }

  const handleOnMouseLeave = () => {
    if(!mobile) setSubmenuVisible(false)
  }

  const handleToggleSubmenu = () => {
    submenuRef.current.classList.add('active');
  }

  const closeSubmenu = () => {
    submenuRef.current.closest(`.menu-item-list.level-${level}`).classList.remove('active');
  }

  useEffect(() => {

  }, []);

  return (
    <li 
      key={item._id} 
      className={level === 0 ? `top-menu-item` : `menu-item level-${level}`}
      onMouseEnter={() => handleOnMouseEnter()}
      onMouseLeave={() => handleOnMouseLeave()}
    >
      <Link to={`${currentPath}${item.url}`}>
        {item.name}
      </Link>
      {
        mobile && item.children.length ? (
          <span className="menu-back-toggle submenu-toggle">
            <FontAwesomeIcon icon={faChevronRight} onClick={handleToggleSubmenu} />
          </span> 
        ) : null
      }
      {
        item.children.length ? (
          <ul ref={submenuRef} className={`menu-item-list level-${level} ${submenuVisible ? 'menu-item-list-visible' : ''}`}>
            {
              mobile ? (
                  <li className={`menu-item level-${level+1}`}>
                    <span className="top-back menu-back-toggle"  onClick={closeSubmenu}><FontAwesomeIcon icon={faChevronLeft} /> Back</span>
                  </li>
                )
              : null
            }
            {item.children.map(child => <MenuItem key={child._id} item={child} level={level+1} mobile={mobile} currentPath={`${currentPath}${item.url}/`}></MenuItem>)}
          </ul>
          ) : null
      }
    </li>
  )
}

export default MenuItem;