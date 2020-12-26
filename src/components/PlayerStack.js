/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react';

import c from '@/utils/c';

/*
    Shows the first card in the react children
    pops an element of the children : This functonality 
    needs to be present in the parent component 
    in the onClick function
*/
const PlayerStack = ({ className, children, ownStack }) => {
  const childrenCount = React.Children.toArray(children).length;

  return (
    <div className={className}>
      {React.Children.map(children, (child, i) => (
        <div className="relative">
          {React.cloneElement(child, {
            className: c(
              child.props.className,
              ownStack || 'cursor-default',
              i === 0 && childrenCount > 1 && 'absolute top-0 left-0 p-1',
              i === 0 && 'z-20',
            ),
          })}
        </div>
      ))}
    </div>
  );
};

PlayerStack.defaultProps = {
  ownStack: false,
};

export default PlayerStack;
