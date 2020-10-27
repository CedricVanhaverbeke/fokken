import React from 'react';

import c from '@/utils/c';

const Avatar = ({ className, firstName, lastName }) => {
  return (
    <div
      className={c(
        className,
        'bg-gray-400 text-sm rounded-full leading-none flex items-center justify-center select-none',
      )}
    >
      <span>
        {firstName.charAt(0)}
        {lastName.charAt(0)}
      </span>
    </div>
  );
};

export default Avatar;
