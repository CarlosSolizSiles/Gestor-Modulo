import React from 'react';

const ResponseMessage = ({ message }) => {
    return message ? <p>{message}</p> : null;
};

export default ResponseMessage;
