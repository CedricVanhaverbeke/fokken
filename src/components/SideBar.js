import React from 'react';

const SideBar = ({ children }) => (
  <div style={{ backgroundColor: '#202141' }} className="h-full bg-white w-64">
    {children}
  </div>
);

export default SideBar;
