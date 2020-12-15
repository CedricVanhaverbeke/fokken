import React from 'react';

import c from '@/utils/c';

const CardHeader = ({
  className,
  number,
  Suit,
  isFacingUp = true,
  showSuits,
}) => (
  <div className={c(className, isFacingUp || 'transform rotate-180')}>
    <div
      className="flex flex-col items-center justify-center "
      style={{ fontSize: showSuits ? '0.6rem' : '0.75rem' }}
    >
      <Suit />
      {showSuits && <span>{number}</span>}
    </div>
  </div>
);

export default CardHeader;
