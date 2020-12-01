import React, { useContext } from 'react';
import { FaHandMiddleFinger } from 'react-icons/fa';

import PlayingStack from './PlayerStack';
import PlayingCard, { suits } from './PlayingCard';
import Seat from './Seat';

import c from '@/utils/c';

import { GameContext } from '@/providers/GameProvider';

const Table = ({ children, className, playableTableCards, playCard }) => {
  const game = useContext(GameContext);

  return (
    <div className={className}>
      <div className="flex flex-col h-full justify-around">
        <Seat className="border-t-8" tableIsRight={true} playerId="1" />
        <Seat tableIsRight={true} playerId="2" />
        <Seat className="border-b-8" tableIsRight={true} playerId="3" />
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
                    className="w-24 h-40 transform"
                    number={card.number}
                    suit={Object.values(suits)[card.suit]}
                    isHidden={j === cards.length - 1}
                  />
                </button>
              ))}
            </PlayingStack>
          ))}
        </div>
      </div>
      <div className="flex flex-col h-full justify-around transform rotate-180">
        <Seat className="border-b-8" tableIsRight={false} playerId="4" />
        <Seat tableIsRight={false} playerId="5" />
        <Seat className="border-t-8" tableIsRight={false} playerId="6" />
      </div>
    </div>
  );
};

export default Table;
