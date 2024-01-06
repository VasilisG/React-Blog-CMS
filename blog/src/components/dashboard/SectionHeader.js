import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SectionHeader = ({title, icon}) => {
    return (
        <div className="card-header dashboard-widget-container d-flex align-items-center">
            <FontAwesomeIcon icon={icon} size="xl" className="section-header-icon"/>
            <h3 className="widget-title card-title text-white fw-lighter">{title}</h3>
        </div>
    )
}

export default SectionHeader;