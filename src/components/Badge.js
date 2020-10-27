import React from 'react';

const Badge = ({ children }) => {
  return (
    <div className="text-sm bg-green-200 text-green-800 rounded-sm px-2 flex">
      {children}
    </div>
  );
};

export default Badge;
