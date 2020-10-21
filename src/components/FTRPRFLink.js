import React from 'react';

const redirect = (endpoint) => {
  window.location = `${process.env.NEXT_PUBLIC_EDU_URL}${endpoint}`;
};

const FTRPRFLink = ({ to, children }) => {
  return (
    <button type="button" onClick={() => redirect(to)}>
      {children}
    </button>
  );
};

export default FTRPRFLink;
