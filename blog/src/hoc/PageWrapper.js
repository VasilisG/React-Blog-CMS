import React from 'react';

const PageWrapper = (WrappedComponent) => {
    return (props) => {
        return (
            <>
                <WrappedComponent {...props}/>
            </>
        );
    }
}

export default PageWrapper;