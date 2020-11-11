import React from 'react';

import c from '@/utils/c';

const Skeleton = () => (
  <div className="flex flex-col w-full" role="loading">
    {Array.from(Array(20), (_, i) => (
      <div className="flex w-full justify-center" key={i}>
        <div className="w-full flex flex-col sm:flex-row gap-x-4">
          <span className="flex-shrink-0 h-8 w-32 bg-gray-200 animate-pulse mb-2" />
          <div className="w-full flex flex-col items-center flex-grow">
            <div className="max-w-6xl w-full">
              <div className="bg-gray-200 animate-pulse rounded mb-4 h-8" />
              {i % 3 === 0 ? (
                <div className="w-full h-32 bg-gray-200 rounded animate-pulse mb-4" />
              ) : (
                <div className="grid grid-cols-2 gap-2 w-full mb-4">
                  <div className="h-12 bg-gray-200 rounded animate-pulse" />
                  <div className="h-12 bg-gray-200 rounded animate-pulse" />
                  <div className="h-12 bg-gray-200 rounded animate-pulse" />
                  <div className="h-12 bg-gray-200 rounded animate-pulse" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default Skeleton;
