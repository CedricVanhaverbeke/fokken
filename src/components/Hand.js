import React from 'react';

import c from '@/utils/c';

const Hand = ({ children }) => {
  return (
    <div className="flex flex-col w-full bg-bgDark items-center justify-center text-gray-500">
      <div
        className={c(
          'flex flex-wrap flex-grow mb-2',
          'w-full justify-center gap-1 lg:gap-x-0',
          React.Children.toArray(children).length === 0 && 'hidden',
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Hand;
