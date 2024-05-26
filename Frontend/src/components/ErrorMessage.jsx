import React from 'react';

const ErrorMessage = ({ error }) => {
    if (!error) return null;

    return (
        <div style={{ color: 'red'}}>
            Error ({error.status}): {error.statusText}.
            <br />
            <span>Please try again later.</span>
        </div>
    );
};

export default ErrorMessage;