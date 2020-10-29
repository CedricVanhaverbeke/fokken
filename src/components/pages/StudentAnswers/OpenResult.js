import React from 'react';

const OpenResult = ({ givenAnswers }) => {
  return (
    <textarea
      className="flex-grow bg-gray-300"
      value={givenAnswers[0].value}
      disabled
    />
  );
};

export default OpenResult;
