import React, { useContext, useEffect } from 'react';

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
    playerHasMoves,
    setGameInfo,
    takePlayedCards,
  } = useContext(GameContext);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (
      hand.length !== 0 &&
      playerHasMoves !== undefined &&
      !playerHasMoves &&
      isTurn
    ) {
      setGameInfo((prev) => ({
        ...prev,
        message: 'No moves left, you receive all the cards',
      }));
      const timeOut = setTimeout(() => {
        takePlayedCards();
      }, 2000);

      return () => clearTimeout(timeOut);
    }
  }, [playerHasMoves, setGameInfo, takePlayedCards, isTurn, hand]);

  // We need to do this useEffect here when the table cards need to be turned
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (
      gameInfo.playedAmount &&
      playedCards.length - gameInfo.playedAmount >= 1
    ) {
      const previousPlayedCards = JSON.parse(JSON.stringify(playedCards));
      const lastPlayedCard = previousPlayedCards.splice(
        -1 * gameInfo.playedAmount,
        gameInfo.playedAmount,
      )[0];

      if (!validMoves(previousPlayedCards).includes(lastPlayedCard.number)) {
        setGameInfo((prev) => ({
          ...prev,
          message: 'Too bad, your card was not good enough',
        }));

        const timeOut = setTimeout(() => {
          takePlayedCards({ passTurn: false });
        }, 2000);

        return () => clearTimeout(timeOut);
      }
    }
  }, [
    playerHasMoves,
    setGameInfo,
    takePlayedCards,
    isTurn,
    playedCards,
    gameInfo.playedAmount,
  ]);

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
        <span className="text-xl mt-4 text-red-500">{gameInfo.message}</span>
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
                    : validMoves(playedCards).includes(number);

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
                          playCards(
                            selection.length > 0
                              ? selection
                              : [{ number, suit }],
                          );
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
