import React, { useState } from 'react';
import MenuItem from './menu-item/MenuItem';
import { useMobile } from '../../hooks/use-mobile';
import MobileMenu from './MobileMenu';

const Menu = ({ data }) => {

  const mobile = useMobile();

  const [mobileMenuActive, setMobileMenuActive] = useState(false);

  const renderTopMenu = () => {
    return data.length ? (
      <>
        {
          mobile 
          ? <MobileMenu data={data} toggleCallback={setMobileMenuActive}/>
          : (
            <ul className="top-menu">
              {
                data.map(topItem => {
                  return <MenuItem key={topItem._id} item={topItem} level={0} mobile={false} currentPath='/category/'/>
                })
              }
            </ul>
          )
        }
      </>
    ) : null;
  }

  return (
    <nav className={`nav-menu ${mobile ? 'mobile' : ''} ${mobileMenuActive && mobile ? 'mobile-active' : ''}`}>
      <div className="nav-menu-inner">
        {renderTopMenu()}
      </div>
    </nav>
  );
}

export default Menu;