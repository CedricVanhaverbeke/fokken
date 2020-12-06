import React, { useState } from 'react';

import Background from './Background';

const NamePopup = ({ onSubmitName }) => {
  const [name, setName] = useState('');

  return (
    <Background>
      <div className="flex flex-col w-full h-full justify-center p-64 bg-white">
        <span>Enter name:</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border-gray-700 border"
        />
        <button className="pt-4" onClick={() => onSubmitName(name)}>
          Submit
        </button>
      </div>
    </Background>
  );
};

export default NamePopup;
