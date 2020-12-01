import React from 'react';

import c from '@/utils/c';

const Hand = ({ children }) => {
  // useCards ofzoiets met API

  return (
    <div
      style={{ maxHeight: '14rem' }}
      className={c(
        'flex h-56 overflow-auto flex-wrap py-1 border border-t',
        'border-gray-500 w-full justify-center gap-1 lg:gap-x-0',
        React.Children.toArray(children).length === 0 && 'hidden',
      )}
    >
      {children}
    </div>
  );
};

export default Hand;
