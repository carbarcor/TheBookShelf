import React from 'react';

// Komponent för felmeddelande
const ErrorMessage = ({ error }) => {
    // Om inget fel, returnera null
    if (!error) return null;

    // Rendera felmeddelande
    return (
        <div style={{ color: 'red'}}>
            Error ({error.status}): {error.statusText}.
            <br />
            <span>Please try again later.</span>
        </div>
    );
};

export default ErrorMessage;