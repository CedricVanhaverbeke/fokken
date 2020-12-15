import React, { useState, useContext } from 'react';

import Hand from '@/components/Hand';
import PlayingCard, { suits } from '@/components/PlayingCard';
import Stack from '@/components/Stack';
import Table from '@/components/Table';
import Debugger from '@/components/Debugger';
import NamePopup from '@/components/Popup/NamePopup';
import SideBar from '@/components/SideBar';
import Lobby from '@/components/Lobby';

import { GameContext } from '@/providers/GameProvider';

import c from '@/utils/c';

const Game = () => {
  const {
    playedCards,
    playCard,
    table,
    hand,
    startGame,
    gameInfo,
    setPlayerInfo,
    playerInfo,
    isHosting,
  } = useContext(GameContext);

  return playerInfo?.name ? (
    <div className="flex w-full h-full">
      <div className="flex flex-col w-full h-full items-center justify-center bg-bgDark">
        {/*<Debugger />*/}
        <Table
          className="flex flex-grow w-full lg:w-3/5 lg:m-4 py-16"
          playableTableCards={table}
          playCard={playCard}
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
        <Hand>
          {hand.map(({ number, suit }, i) => (
            <button
              key={`hand${number}${suit}`}
              onClick={() => playCard(true, number, suit, { handIndex: i })}
            >
              <PlayingCard
                className={c(
                  'w-20 h-32',
                  'transform scale-75 md:scale-90 shadow-lg',
                  'transition-all lg:transform hover:-translate-y-1',
                  i === 0 || '-ml-12 md:-ml-8 lg:-ml-4',
                )}
                key={`${number}${suit}`}
                number={number}
                suit={Object.values(suits)[suit]}
              />
            </button>
          ))}
        </Hand>
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
