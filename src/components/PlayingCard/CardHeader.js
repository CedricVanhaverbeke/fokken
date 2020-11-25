import React from 'react';

import c from '@/utils/c';

const CardHeader = ({ className, number, Suit, isFacingUp = true }) => (
  <div className={c(className, isFacingUp || 'transform rotate-180')}>
    <div
      className="flex flex-col items-center justify-center "
      style={{ fontSize: '0.6rem' }}
    >
      <Suit />
      <span>{number}</span>
    </div>
  </div>
);

export default CardHeader;
