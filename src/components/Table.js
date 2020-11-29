import React, { useContext } from 'react';
import { FaHandMiddleFinger } from 'react-icons/fa';

import PlayingStack from './PlayerStack';
import PlayingCard, { suits } from './PlayingCard';
import Seat from './Seat';

import c from '@/utils/c';

import { GameContext } from '@/providers/GameProvider';

const Table = ({ children, className, playableTableCards }) => {
  const game = useContext(GameContext);

  return (
    <div className={className}>
      <div className="flex flex-col h-full justify-around">
        <Seat className="border-t-8" tableIsRight={true} />
        <Seat tableIsRight={true} />
        <Seat className="border-b-8" tableIsRight={true} />
      </div>
      <div
        style={{ background: '#35654d' }}
        className={c(
          'flex flex-col flex-grow items-center justify-center border-b-8 border-t-8 border-gray-1000',
        )}
      >
        {children}
        <div className="absolute ml-auto mr-auto">
          <div className="flex flex-col items-center justify-center opacity-50">
            <div className="text-6xl mb-2">
              <FaHandMiddleFinger />
            </div>
            <span>FOKWITHME.COM</span>
          </div>
        </div>
        <div className={c('transform items-center flex scale-60 gap-x-2')}>
          {playableTableCards.map((cards, i) => (
            <PlayingStack
              key={`stack${i}`}
              canPlay={game.canPlayFromTable}
              ownStack={true}
            >
              {cards.map((card, j) => (
                <PlayingCard
                  key={`${card.number}${card.suit}`}
                  className="w-24 h-40 transform"
                  number={card.number}
                  suit={Object.values(suits)[card.suit]}
                  isHidden={j === 0}
                />
              ))}
            </PlayingStack>
          ))}
        </div>
      </div>
      <div className="flex flex-col h-full justify-around transform rotate-180">
        <Seat className="border-b-8" tableIsRight={false} />
        <Seat tableIsRight={false} />
        <Seat className="border-t-8" tableIsRight={false} />
      </div>
    </div>
  );
};

export default Table;
