import React from 'react';

const OpenResult = ({ givenAnswer }) => {
  return <textarea value={givenAnswer.value} disabled />;
};

export default OpenResult;
