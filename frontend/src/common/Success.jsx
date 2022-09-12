import React from 'react';

const Success = ({ children, alertClass }) => {
    return (
        <div style={{
            backgroundColor: '#f1f7e9',
            borderRadius: '2px',
            fill: '7bc144',
            padding: '1rem',
        }} data-testid="success">
            {children || 'Data added successfully.'}
        </div>
    );
};
export default Success;