import React from 'react';

import c from '@/utils/c';

const Hand = ({ children, isTurn }) => {
  return (
    <div className="flex flex-col w-full bg-bgDark items-center justify-center text-gray-500">
      {isTurn && <span className="mb-2 text-red-500">Your turn</span>}
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
