import { React, useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'

const CategoryItem = ({id, name, children, callback}) => {

    const { currentCategory } = useSelector((state) => {
        return state.categories;
    })

    const [childrenVisible, setChildrenVisible] = useState(false);

    const toggleChildren = () => {
        setChildrenVisible(!childrenVisible);
    }

    const selectedItemClass = () => {
        return (currentCategory !== null && currentCategory._id === id) ? 'selected-category' : '';
    }

    if(children.length > 0){
        return (
            <li id={id} className="category-item parent-item">
                <span className="category-icon" onClick={toggleChildren}>
                    <FontAwesomeIcon icon={faCaretRight} rotation={childrenVisible ? 90 : 0} className="category-icon"/>
                </span>
                <span 
                    className={`category-name p-1 ${selectedItemClass()}`}
                    onClick={() => callback(id) }
                >
                    {name}
                </span>
                <ul className={`category-children ${childrenVisible ? 'visible': ''}`}>
                    {children.map(child => {
                        return <CategoryItem 
                                    key={child._id} 
                                    id={child._id} 
                                    name={child.name} 
                                    children={child.children}
                                    callback={callback}
                                />
                    })}
                </ul>
            </li>
        );
    }
    else {
        return (
            <li 
                id={id} 
                className="category-item"
            >
                <span 
                    className={`category-name p-1 ${selectedItemClass()}`} 
                    onClick={() => callback(id) }
                >
                    {name}
                </span>
            </li>
        );
    }
}

export default CategoryItem;