import React from 'react';

const Alert = ({children}) => {

    return (
        <div style={{
            borderLeft: '6px solid #e32d23',
            borderRadius: '2px',
            fill: '#eb6761',
            backgroundColor: '#fdeeed',
            padding: '1rem',
        }} data-testid="alert">
            {children || 'Something went wrong.'}
        </div>
    );
};
export default Alert;
