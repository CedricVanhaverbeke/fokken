import React, { useState, useContext } from 'react';

import Hand from '@/components/Hand';
import PlayingCard, { suits } from '@/components/PlayingCard';
import Stack from '@/components/Stack';
import Table from '@/components/Table';
import Debugger from '@/components/Debugger';

import { GameContext } from '@/providers/GameProvider';

import c from '@/utils/c';

const Game = () => {
  const {
    playedCards,
    playCard,
    table,
    hand,
    startGame,
    gameIsStarted,
  } = useContext(GameContext);

  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <Debugger />
      <Table
        className="flex w-full lg:w-4/5 flex-grow lg:m-4 p-2"
        playableTableCards={table}
        playCard={playCard}
      >
        <Stack className="w-88 flex-grow transform translate-y-16">
          {playedCards.map(({ number, suit }) => (
            <PlayingCard
              className="w-24 h-40"
              key={`${number}${suit}`}
              number={number}
              suit={Object.values(suits)[suit]}
            />
          ))}
        </Stack>
      </Table>
      <Hand>
        {hand.map(({ number, suit }, i) => (
          <button
            key={`hand${number}${suit}`}
            onClick={() => playCard(true, number, suit, { handIndex: i })}
          >
            <PlayingCard
              className={c(
                'w-24 h-40',
                'transition-all lg:transform hover:-translate-y-1',
                i === 0 || 'lg:-ml-4',
              )}
              key={`${number}${suit}`}
              number={number}
              suit={Object.values(suits)[suit]}
            />
          </button>
        ))}
      </Hand>
      {gameIsStarted || (
        <div className="flex h-28 justify-center items-center">
          <button className="text-center" onClick={startGame}>
            Start game
          </button>
        </div>
      )}
    </div>
  );
};

export default Game;
