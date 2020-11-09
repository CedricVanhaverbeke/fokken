import React from 'react';

export const PageTitleSkeleton = () => (
  <h1 className="text-4xl font-bold leading-none">
    <div className="text-2xl mb-2 w-36 text-gray-300 font-semibold bg-gray-300 animate-pulse rounded">
      Title
    </div>

    <div className="text-gray-300 bg-gray-300 w-88 rounded animate-pulse">
      Subtitle
    </div>
  </h1>
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
