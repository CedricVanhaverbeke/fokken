/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import c from '@/utils/c';

/*
    Shows the first card in the react children
    pops an element of the children : This functonality 
    needs to be present in the parent component 
    in the onClick function
*/
const PlayerStack = ({ children, onClick, canPlay, ownStack }) => (
  <div className="relative">
    {React.Children.map(children, (child, i) =>
      React.cloneElement(child, {
        className: c(
          child.props.className,
          ownStack || 'cursor-default',
          ownStack && 'transform hover:-translate-y-1',
          i !== 0 || 'absolute top-0 left-0 p-1',
          i === 0 && 'z-20',
        ),
      }),
    )}
  </div>
);

PlayerStack.defaultProps = {
  ownStack: false,
};

export default PlayerStack;
