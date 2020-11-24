import React from 'react';

import Stack from '@/components/Stack';
import PlayingCard from '@/components/PlayingCard';

const Game = () => {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <h1>Card:</h1>
      <PlayingCard number={6} symbol={'hearts'} />
      <h1>Stack:</h1>
      <Stack className="w-88 h-112">
        <div className="bg-black w-24 h-48" />
        <div className="bg-red-600 w-48 h-24" />
      </Stack>
    </div>
  );
};

export default Game;
