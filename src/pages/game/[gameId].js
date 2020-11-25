import React from 'react';

import PlayingCard, { suits } from '@/components/PlayingCard';
import Stack from '@/components/Stack';

const Game = () => {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <h1>Stack:</h1>
      <Stack className="w-88 h-112">
        <PlayingCard number={6} symbol={suits.hearts} />
        <PlayingCard
          number={6}
          symbol={suits.diamonds}
          className="transform rotate-90"
        />
      </Stack>
    </div>
  );
};

export default Game;
