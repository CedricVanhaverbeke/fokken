import React, { useContext } from 'react';

import Logo from './Logo';
import PlayingStack from './PlayerStack';
import PlayingCard, { suits } from './PlayingCard';
import Seat from './Seat';

import c from '@/utils/c';

import { GameContext } from '@/providers/GameProvider';

const Table = ({ children, className, playableTableCards, playCard }) => {
  const game = useContext(GameContext);

  return (
    <div className={className}>
      {
        <div className="flex flex-col h-full justify-around">
          <Seat
            className="border-t-4 rounded-tl-full"
            tableIsRight={true}
            playerIndex={2}
          />
          <Seat
            className="border-b-4 rounded-bl-full"
            tableIsRight={true}
            playerIndex={1}
          />
        </div>
      }
      <div
        className={c(
          'flex flex-col flex-grow items-center justify-center bg-table',
          'border-b-4 border-t-4 border-red-500',
        )}
      >
        {children}
        {<Logo className="absolute ml-auto mr-auto opacity-50" />}
        {
          <div className={c('items-center flex gap-x-2')}>
            {playableTableCards.map((cards, i) => (
              <PlayingStack
                key={`stack${i}`}
                canPlay={game.canPlayFromTable}
                ownStack={true}
              >
                {cards.map((card, j) => (
                  <button
                    key={`${card.number}${card.suit}`}
                    onClick={() =>
                      playCard(false, card.number, card.suit, {
                        stackIndex: i,
                        isHidden: j === cards.length - 1,
                      })
                    }
                  >
                    <PlayingCard
                      className="w-12 h-20"
                      number={card.number}
                      showSuits={false}
                      suit={Object.values(suits)[card.suit]}
                      isHidden={j === cards.length - 1}
                    />
                  </button>
                ))}
              </PlayingStack>
            ))}
          </div>
        }
      </div>
      {
        <div className="flex flex-col h-full justify-around">
          <Seat
            className="border-t-4 rounded-tr-full"
            tableIsRight={false}
            playerIndex={3}
          />
          <Seat
            className="border-b-4 rounded-br-full"
            tableIsRight={false}
            playerIndex={4}
          />
        </div>
      }
    </div>
  );
};

export default Table;
