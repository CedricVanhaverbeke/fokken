import React from 'react';

import c from '@/utils/c';

const rotations = ['', 'rotate-6', 'rotate-12', 'rotate-45', 'rotate-90'].sort(
  () => 0.5 - Math.random(),
);

const Stack = ({ children, className }) => (
  <div className={c(className, 'relative z-10 rot')}>
    {React.Children.map(children, (child, i) =>
      React.cloneElement(child, {
        className: c(
          child?.props?.className,
          'absolute left-0 right-0 ml-auto m-auto top-0 bottom-0 transform',
          rotations[i % rotations.length],
        ),
        key: i,
      }),
    )}
  </div>
);

export default Stack;
