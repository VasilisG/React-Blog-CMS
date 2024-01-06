import React from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../config/env';

const Breadcrumbs = ({ crumbs, prefix }) => {

  const renderLink = (crumb, length, index) => {
    return index !== length-1 ? (
      <Link className="breadcrumb-link" to={`${BASE_URL}${prefix}/${crumb.url}`} itemProp="item">
        <span itemProp="name">{crumb.name}</span>
      </Link>
    ) : (
      <span className="breadcrumb-trail">
        <span itemProp="name">{crumb.name}</span>
      </span>
    );
  }

  return crumbs && crumbs.length ? (
    <div className="breadcrumbs">
      <ol className="breadcrumb-list" itemScope itemType="https://schema.org/BreadcrumbList">
        <li className="breadcrumb-item" key={1} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          <Link to={BASE_URL} itemProp="item">
            <span itemProp="name">Home</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>
        {
          crumbs.map((crumb, index) => {
            return (
              <li className="breadcrumb-item" key={index+2} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                {renderLink(crumb, crumbs.length, index)}
                <meta itemProp="position" content={index+2} />
              </li>
            )
          })
        }
      </ol>
    </div>
  ) : null;

}

export default Breadcrumbs;