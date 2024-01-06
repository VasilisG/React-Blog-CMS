import React from 'react';
import {NavLink} from 'react-router-dom';

const CreateLink = ({additional_class, text, router_name}) => {
    return (
        <NavLink className={`create-link ${additional_class}`} to={router_name}>
            <span>{text}</span>
        </NavLink>
    );
}

export default CreateLink;