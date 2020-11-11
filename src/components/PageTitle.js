import React from 'react';

export const PageTitleSkeleton = () => (
  <div>
    <div className="w-36 h-6 mb-2 bg-gray-300 animate-pulse rounded" />
    <div className="bg-gray-300 h-10 w-88 rounded animate-pulse -mb-1" />
  </div>
);

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
