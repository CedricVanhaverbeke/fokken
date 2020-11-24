import React from 'react';

import c from '@/utils/c';

const Stack = ({ children, className }) => (
  <div className={c(className, 'relative')}>
    {React.Children.map(children, (child, i) =>
      React.cloneElement(child, {
        className: c(
          child.props.className,
          'absolute left-0 right-0 ml-auto m-auto top-0 bottom-0',
        ),
        key: i,
      }),
    )}
  </div>
);

export default Stack;
