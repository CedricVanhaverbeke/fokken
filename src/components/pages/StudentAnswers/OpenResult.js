import React from 'react';

const OpenResult = ({ givenAnswer }) => {
  return (
    <textarea
      className="flex-grow bg-gray-300"
      value={givenAnswer[0].value}
      disabled
    />
  );
};

export default OpenResult;
