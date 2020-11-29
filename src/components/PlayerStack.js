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
const PlayerStack = ({ children, onClick, canPlay, ownStack }) => {
  return React.Children.map(children, (child, i) => (
    <button
      onClick={() => {
        if (canPlay) {
          console.log('plays the card from the table');
          return;
        }
        console.log('Cannot play card from table');
      }}
      className={c(
        ownStack || 'cursor-default',
        i === 0 && ownStack && 'transform hover:-translate-y-1',
        i === 0 || 'hidden',
      )}
    >
      {child}
    </button>
  ));
};

PlayerStack.defaultProps = {
  ownStack: false,
};

export default PlayerStack;
