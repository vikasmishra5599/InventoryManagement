import React from 'react';

const Success = ({ message }) => {
    return (
        <div style={{
            backgroundColor: '#f1f7e9',
            borderRadius: '2px',
            fill: '7bc144',
            padding: '1rem',
        }} data-testid="success">
            {message || 'Data added successfully.'}
        </div>
    );
};
export default Success;