import React from 'react';

import c from '@/utils/c';

const Button = ({ onClick, className, children }) => (
  <button onClick={onClick} className={c(className)}>
    {children}
  </button>
);

export default Button;
