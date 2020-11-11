import React from 'react';

import c from '@/utils/c';

const Skeleton = () => (
  <div className="flex flex-col w-full" role="loading">
    {Array.from(Array(20), (_, i) => (
      <div className="flex w-full justify-center" key={i}>
        <div className="w-full flex flex-col sm:flex-row">
          <span className="flex-shrink-0 h-8 w-32 bg-gray-200 animate-pulse mb-2" />
          <div className="w-full flex flex-col items-center flex-grow">
            <div className="max-w-6xl w-full">
              <div
                className={c(
                  'bg-gray-200 animate-pulse rounded mb-4',
                  i % 2 === 0 ? 'h-32' : 'h-24',
                )}
              />
              {i % 2 === 0 && (
                <div className="grid grid-cols-2 gap-2 w-full mb-4">
                  {Array.from(
                    Array(Math.floor((Math.random() * 10) % 5)),
                    (_, i) => (
                      <div
                        className="h-12 bg-gray-200 rounded animate-pulse"
                        key={`answer${i}`}
                      />
                    ),
                  )}
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
