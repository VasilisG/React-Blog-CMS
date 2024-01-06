import React from 'react';

const ActionButton = ({additional_class, text, clickCallback}) => {
    return (
        <button type="button" 
                className={`btn action-button ${additional_class}`} 
                onClick={clickCallback}>
                    {text}
        </button>
    );
}

export default ActionButton;