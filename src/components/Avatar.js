import React from 'react';

import c from '@/utils/c';

const Avatar = ({ className, firstName, lastName }) => {
  return (
    <div
      className={c(
        className,
        'bg-gray-400 font-bold p-4 rounded-full leading-none flex items-center justify-center',
      )}
    >
      <span>{firstName.charAt(0)}</span>
      <span>{lastName.charAt(0)}</span>
    </div>
  );
};

export default Avatar;
