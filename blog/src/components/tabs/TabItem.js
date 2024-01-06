import React from 'react';
import { Link } from 'react-router-dom';

const TabItem = ({entity, data, active, field}) => {

  const renderData = () => {
    return (
      <ul className={`tab-list ${active ? 'tab-list-active' : ''}`}>
        {data.map(
          item => {
            return (
              <li 
                key={item._id} 
                data-id={item._id} 
                className="tab-list-item">
                  <Link to={`${entity}/edit/${item._id}`}>
                    {item[field]}
                  </Link>
              </li>
            );
          } 
        )}
      </ul>
    );
  }

  const renderNoItemsMessage = () => {
    return <p className="no-items">No items found for this entity.</p>
  }

  const renderContent = () => {
    return (
      <div className={`tab-item ${active ? 'tab-active-item' : ''}`}>
        {data.length ? renderData() : renderNoItemsMessage()}
      </div>
    );
  }

  return renderContent();
}

export default TabItem;