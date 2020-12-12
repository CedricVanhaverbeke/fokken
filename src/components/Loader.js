import React, { useState, useEffect } from 'react';

import c from '@/utils/c';

const Loader = ({ text, className }) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const loaderTimer = setTimeout(() => {
      setDots((prev) => {
        const length = prev.split('').length;
        return Array((length + 1) % 4)
          .fill('.')
          .join('');
      });
    }, [500]);

    () => clearTimeout(loaderTimer);
  });

  return (
    <span className={c(className, 'grid grid-cols-2 ml-24')}>
      <span className="text-right">{text}</span>
      <span className="">{dots}</span>
    </span>
  );
};

Loader.defaultProps = {
  text: 'Loading',
};

export default Loader;
