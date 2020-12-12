import React, { useState, useContext } from 'react';
import { FaUser } from 'react-icons/fa';

import PlayingStack from './PlayerStack';
import PlayingCard, { suits } from './PlayingCard';

import { GameContext } from '@/providers/GameProvider';

import c from '@/utils/c';

const Seat = ({ className, tableIsRight, playerIndex }) => {
  const { otherPlayerCardsTable } = useContext(GameContext);

  const thisPlayer = otherPlayerCardsTable[playerIndex];

  const stacks =
    playerIndex < Object.keys(otherPlayerCardsTable).length
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
          'self-center text-xs',
          'bg-white rounded-full w-20 h-20 flex items-center justify-center',
          thisPlayer?.userName || (true && 'border border-gray-600'),
        )}
      >
        <div className="w-full h-full relative">
          {thisPlayer?.userName ||
            (true && (
              <>
                <FaUser className="w-full h-full p-6 text-gray-600" />
                <span className="absolute -bottom-1 bg-gray-600 p-1 rounded-md">
                  {thisPlayer?.userName}ANOUK
                </span>
              </>
            ))}
        </div>
      </div>

      <div
        style={{ background: '#35654d' }}
        className={c(
          'border-gray-1000 flex items-center justify-center -translate-10',
          tableIsRight ? 'border-l-8' : 'border-r-8',
          className,
        )}
      >
        <div className={c('transform items-center flex scale-60 gap-x-2')}>
          {stacks.map((cards, i) => (
            <PlayingStack key={`stack${i}`} canPlay={false} ownStack={false}>
              {cards.map((card, j) => (
                <div key={`${card.number}${card.suit}`}>
                  <PlayingCard
                    className="w-24 h-40 transform"
                    number={card.number}
                    suit={Object.values(suits)[card.suit]}
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
