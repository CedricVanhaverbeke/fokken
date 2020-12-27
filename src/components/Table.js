import React, { useContext } from 'react';

import Logo from './Logo';
import PlayingStack from './PlayerStack';
import PlayingCard, { suits } from './PlayingCard';
import Seat from './Seat';

import c from '@/utils/c';
import validMoves from '@/utils/validMoves';

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
            playerIndex={1}
          />
          <Seat
            className="border-b-4 rounded-bl-full"
            tableIsRight={true}
            playerIndex={0}
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
            {playableTableCards.map((cards, i) => {
              return (
                <PlayingStack
                  key={`stack${i}`}
                  canPlay={game.canPlayFromTable}
                  ownStack={true}
                >
                  {cards.map((card, j) => {
                    const isPlayable =
                      (game.canPlayFromTable &&
                        game.isTurn &&
                        validMoves(game.playedCards).includes(card.number)) ||
                      game.canPlayHiddenFromTable;

                    return (
                      <button
                        className={c(
                          isPlayable
                            ? '-translate-y-1 transform hover:-translate-y-2'
                            : 'cursor-not-allowed',
                        )}
                        key={`${card.number}${card.suit}`}
                        onClick={() => {
                          if (
                            isPlayable ||
                            (game.canPlayHiddenFromTable &&
                              j === cards.length - 1)
                          ) {
                            playCard(card);
                          }
                        }}
                      >
                        <PlayingCard
                          className={c('w-12 h-20')}
                          number={card.number}
                          showSuits={false}
                          suit={Object.values(suits)[card.suit]}
                          isHidden={j === cards.length - 1}
                        />
                      </button>
                    );
                  })}
                </PlayingStack>
              );
            })}
          </div>
        }
      </div>
      {
        <div className="flex flex-col h-full justify-around">
          <Seat
            className="border-t-4 rounded-tr-full"
            tableIsRight={false}
            playerIndex={2}
          />
          <Seat
            className="border-b-4 rounded-br-full"
            tableIsRight={false}
            playerIndex={3}
          />
        </div>
      }
    </div>
  );
};

export default Table;
