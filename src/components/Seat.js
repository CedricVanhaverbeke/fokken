import React, { useContext } from 'react';

import PlayingStack from './PlayerStack';
import PlayingCard, { suits } from './PlayingCard';

import c from '@/utils/c';

import { GameContext } from '@/providers/GameProvider';

// eslint-disable-next-line complexity
const Seat = ({ className, tableIsRight, playerIndex }) => {
  const { otherPlayerCards, gameInfo } = useContext(GameContext);

  const thisPlayer = otherPlayerCards[playerIndex];

  const stacks =
    playerIndex < Object.keys(otherPlayerCards).length
      ? thisPlayer.table
      : [[], [], []];

  return (
    <div
      className={c(
        'flex flex-grow gap-x-2',
        !tableIsRight && 'flex-row-reverse',
      )}
    >
      <div
        className={c(
          'flex flex-col items-center justify-center border',
          thisPlayer?.userName ? '' : 'invisible',
          'text-xs bg-bg rounded-full w-16 h-16',
          (playerIndex === 0 || playerIndex === 3) && 'self-end',
          (playerIndex === 1 || playerIndex === 2) && 'self-start',
          thisPlayer?.id === gameInfo.turn
            ? 'border-red-500'
            : 'border-gray-600',
        )}
      >
        <span className="text-2xl text-white">{thisPlayer?.hand}</span>
        <div className="relative">
          <span className="absolute -bottom-4 bg-gray-600 p-1 rounded-md">
            {thisPlayer?.userName}
          </span>
        </div>
      </div>

      <div
        className={c(
          'border-red-500 flex items-center justify-center bg-table',
          tableIsRight ? 'border-l-4' : 'border-r-4',
          className,
        )}
      >
        <div
          className={c(
            'items-center flex',
            playerIndex === 0 && 'pl-4 transform rotate-45',
            playerIndex === 1 && 'pl-4 transform -rotate-45',
            playerIndex === 2 && 'pr-4 transform rotate-45',
            playerIndex === 3 && 'pr-4 transform -rotate-45',
          )}
        >
          {stacks.map((cards, i) => (
            <PlayingStack
              className="w-12 h-20"
              key={`stack${i}`}
              canPlay={false}
              ownStack={false}
            >
              {cards.map((card, j) => (
                <div key={`${card?.number}${card?.suit}`}>
                  <PlayingCard
                    className="w-12 h-20"
                    showSuits={false}
                    number={card?.number || 0}
                    suit={Object.values(suits)[card?.suit || 0]}
                    isHidden={j === cards.length - 1}
                  />
                </div>
              ))}
            </PlayingStack>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Seat;
