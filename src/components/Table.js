import React, { useContext } from 'react';

import PlayingStack from './PlayerStack';
import PlayingCard, { suits } from './PlayingCard';
import Seat from './Seat';
import Logo from './Logo';

import c from '@/utils/c';

import { GameContext } from '@/providers/GameProvider';

const Table = ({ children, className, playableTableCards, playCard }) => {
  const game = useContext(GameContext);

  return (
    <div className={className}>
      <div className="flex flex-col h-full justify-around">
        <Seat className="border-t-8" tableIsRight={true} playerIndex={1} />
        <Seat tableIsRight={true} playerIndex={2} />
        <Seat className="border-b-8" tableIsRight={true} playerIndex={3} />
      </div>
      <div
        style={{ background: '#35654d' }}
        className={c(
          'flex flex-col flex-grow items-center justify-center border-b-8 border-t-8 border-gray-1000',
        )}
      >
        {children}
        <Logo className="absolute ml-auto mr-auto opacity-50" />
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
      <div className="flex flex-col h-full justify-around">
        <Seat className="border-t-8" tableIsRight={false} playerIndex={4} />
        <Seat tableIsRight={false} playerIndex={5} />
        <Seat className="border-b-8" tableIsRight={false} playerIndex={6} />
      </div>
    </div>
  );
};

export default Table;
