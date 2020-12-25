import React from 'react';

import c from '@/utils/c';

import CardStack from '@/components/PlayerStack';
import PlayingCard, { suits } from '@/components/PlayingCard';

const HiddenCard = () => (
  <PlayingCard
    className="w-20 h-32"
    isHidden={true}
    suit={suits.diamonds}
    number={0}
  />
);

// cards in this pile don't matter
const DrawPile = ({ className, drawPileAmount }) => {
  return (
    <div className="flex flex-col self-end items-center">
      <span className="mb-2 text-red-500">{drawPileAmount}</span>
      <CardStack className={c(className)}>
        <HiddenCard />
      </CardStack>
    </div>
  );
};

export default DrawPile;
