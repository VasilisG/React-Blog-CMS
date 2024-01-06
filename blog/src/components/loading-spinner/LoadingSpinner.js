import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
        <FontAwesomeIcon icon={faCircleNotch} size="xl" className="loading-spinner fa-spin"/>
    </div>
  );
}

export default LoadingSpinner;