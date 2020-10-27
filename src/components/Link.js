import React from 'react';
import NextLink from 'next/link';

import c from '@/utils/c';

const Link = ({ href, disabled, children }) => {
  const element = (
    <span
      className={c(
        disabled
          ? 'cursor-none text-blue-200 cursor-not-allowed'
          : 'cursor-pointer text-blue-700 ',
      )}
    >
      {children}
    </span>
  );

  return disabled ? element : <NextLink href={href}>{element}</NextLink>;
};

export default Link;
