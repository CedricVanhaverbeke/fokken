import React, { useState } from 'react';

import c from '@/utils/c';

const Collapsable = ({ trigger, initialValue, children }) => {
  const [isShown, setIsShown] = useState(initialValue);

  return (
    <>
      {React.cloneElement(trigger, {
        onClick: () => setIsShown((prev) => !prev),
        className: c(trigger.props.className, 'hover:cursor-pointer'),
      })}
      {isShown && children}
    </>
  );
};

Collapsable.defaultProps = {
  defaultValue: true,
};

export default Collapsable;
