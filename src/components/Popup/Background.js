import React from 'react';

const Popup = ({ children }) => {
  return (
    <div
      style={{ zIndex: '100' }}
      className="w-screen h-screen absolute bg-gray-800"
    >
      {children}
    </div>
  );
};

export default Popup;
