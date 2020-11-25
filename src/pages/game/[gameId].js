import React, { useState } from 'react';

import Hand from '@/components/Hand';
import PlayingCard, { suits } from '@/components/PlayingCard';
import Stack from '@/components/Stack';
import Table from '@/components/Table';

const Game = () => {
  const [cardStack, setCardStack] = useState([]);
  const [hand, setHand] = useState([
    { number: 1, suit: 0 },
    { number: 2, suit: 1 },
    { number: 3, suit: 2 },
    { number: 4, suit: 1 },
    { number: 5, suit: 3 },
    { number: 10, suit: 0 },
  ]);

  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <Table className="flex w-4/5 flex-grow m-8 items-center justify-center">
        <Stack className="w-88 h-64">
          {cardStack.map(({ number, suit }) => (
            <PlayingCard
              key={`${number}${suit}`}
              number={number}
              suit={Object.values(suits)[suit]}
            />
          ))}
        </Stack>
      </Table>
      <Hand
        onPlayCard={(i) => {
          setCardStack((prev) => [...prev, hand[i]]);
          setHand((prev) => {
            const newHand = [...prev];
            newHand.splice(i, 1);
            return newHand;
          });
        }}
      >
        {hand.map(({ number, suit }) => (
          <PlayingCard
            key={`${number}${suit}`}
            number={number}
            suit={Object.values(suits)[suit]}
          />
        ))}
      </Hand>
    </div>
  );
};

export default Game;
