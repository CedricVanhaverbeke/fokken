import React from 'react';

import c from '@/utils/c';

const Hand = ({ children, onPlayCard }) => {
  // useCards ofzoiets met API

  return (
    <div className="flex p-1 border border-t border-gray-500 w-full justify-center h-48">
      {React.Children.map(children, (child, i) => (
        <button onClick={() => onPlayCard(i)}>
          {React.cloneElement(child, {
            className: c(
              child?.props?.className,
              'transition-all transform hover:-translate-y-1',
              i === 0 || '-ml-4',
            ),
          })}
        </button>
      ))}
    </div>
  );
};

export default Hand;
