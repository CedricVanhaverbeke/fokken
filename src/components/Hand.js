import React from 'react';

import c from '@/utils/c';

const Hand = ({ children, onPlayCard }) => {
  // useCards ofzoiets met API

  return (
    <div
      style={{ maxHeight: '12rem' }}
      className={c(
        'flex h-48 overflow-auto flex-wrap py-1 border border-t',
        'border-gray-500 w-full justify-center gap-1 lg:gap-x-0',
        React.Children.toArray(children).length === 0 && 'hidden',
      )}
    >
      {React.Children.map(children, (child, i) => (
        <button onClick={() => onPlayCard(i)}>
          {React.cloneElement(child, {
            className: c(
              child?.props?.className,
              'w-24 h-40',
              'transition-all lg:transform hover:-translate-y-1',
              i === 0 || 'lg:-ml-4',
            ),
          })}
        </button>
      ))}
    </div>
  );
};

export default Hand;
