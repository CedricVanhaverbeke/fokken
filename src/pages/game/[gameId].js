import React, { useContext } from 'react';

import useMultiSelection from '@/hooks/useMultiSelection';

import c from '@/utils/c';
import validMoves from '@/utils/validMoves';

import DrawPile from '@/components/DrawPile';
import Hand from '@/components/Hand';
import Lobby from '@/components/Lobby';
import PlayingCard, { suits } from '@/components/PlayingCard';
import NamePopup from '@/components/Popup/NamePopup';
import SideBar from '@/components/SideBar';
import Stack from '@/components/Stack';
import Table from '@/components/Table';
import { GameContext } from '@/providers/GameProvider';

const Game = () => {
  const {
    playedCards,
    playCards,
    table,
    hand,
    startGame,
    gameInfo,
    setPlayerInfo,
    playerInfo,
    isHosting,
    isTurn,
  } = useContext(GameContext);

  const {
    selection,
    toggleSelected,
    isSelected,
    selectionContainsNumber,
    emptySelection,
  } = useMultiSelection();

  return playerInfo?.name ? (
    <div className="flex w-full h-full">
      <div className="flex flex-col w-full h-full items-center justify-center bg-bgDark">
        <span className="text-xl">{gameInfo.message}</span>
        <Table
          className="flex flex-grow w-full lg:w-3/5 lg:m-4 py-16"
          playableTableCards={table}
          playCard={playCards}
        >
          <Stack className="w-88 flex-grow">
            {playedCards.map(({ number, suit }) => (
              <PlayingCard
                className={c(
                  'w-24 h-40',
                  'transform scale-50 sm:scale-60 lg:scale-75',
                )}
                key={`${number}${suit}`}
                number={number}
                suit={Object.values(suits)[suit]}
              />
            ))}
          </Stack>
        </Table>

        {gameInfo.isStarted && (
          <div className="flex jusitfy-between w-full">
            <Hand className="ml-24" isTurn={isTurn}>
              {hand.map(({ number, suit }, i) => {
                const isPlayable =
                  isTurn && selection.length > 0
                    ? selectionContainsNumber(number)
                    : validMoves(
                        playedCards.length > 0
                          ? playedCards[playedCards.length - 1]
                          : { number: 0 },
                      ).includes(number);

                const multipleOfThisNumber =
                  hand.filter((card) => card.number === number).length > 1;

                return (
                  <button
                    key={`hand${number}${suit}`}
                    onClick={() => {
                      if (isPlayable && !multipleOfThisNumber) {
                        playCards({ number, suit });
                      }
                    }}
                  >
                    <PlayingCard
                      className={c(
                        'w-20 h-32',
                        'transform scale-75 md:scale-90 shadow-lg',
                        'transition-all lg:transform ',
                        i === 0 || '-ml-12 md:-ml-8 lg:-ml-4',
                        isPlayable
                          ? 'transform mb-2 hover:-translate-y-1'
                          : 'cursor-not-allowed',
                      )}
                      key={`${number}${suit}`}
                      number={number}
                      suit={Object.values(suits)[suit]}
                      hasExtraOptions={
                        isSelected({ number, suit }) ||
                        (isPlayable && selectionContainsNumber(number))
                      }
                      hasExtraHoverOptions={isPlayable && multipleOfThisNumber}
                      onSelect={() => toggleSelected({ number, suit })}
                      isSelected={isSelected({ number, suit })}
                      selectionLength={selection.length}
                      onPlayCards={() => {
                        if (isPlayable) {
                          playCards(selection);
                          emptySelection();
                        }
                      }}
                    />
                  </button>
                );
              })}
            </Hand>
            <DrawPile
              drawPileAmount={gameInfo.drawPileAmount}
              className="self-end mr-2"
            />
          </div>
        )}
      </div>

      {gameInfo.isStarted || (
        <SideBar>
          <Lobby
            isHosting={isHosting}
            players={gameInfo.otherPlayers}
            ownName={playerInfo.name}
            startGame={startGame}
          />
        </SideBar>
      )}
    </div>
  ) : (
    <NamePopup
      onSubmitName={(name) => setPlayerInfo((prev) => ({ ...prev, name }))}
    />
  );
};

export default Game;
