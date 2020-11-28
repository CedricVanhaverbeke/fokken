/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import c from '@/utils/c';

/*
    Shows the first card in the react children
    pops an element of the children : This functonality 
    needs to be present in the parent component 
    in the onClick function
*/
const PlayerStack = ({ children, onClick }) => {
  return React.Children.map(children, (child, i) =>
    React.cloneElement(child, {
      className: c(child.props.className, i !== 0 && 'hidden'),
      onClick: onClick,
    }),
  );
};

export default PlayerStack;
