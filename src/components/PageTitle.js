import React from 'react';

const PageTitle = ({ label, children }) => {
  return (
    <h1 className="text-4xl font-bold leading-none">
      {label && (
        <div className="mb-2 text-2xl text-gray-600 font-semibold">{label}</div>
      )}
      {children}
    </h1>
  );
};

export default PageTitle;
