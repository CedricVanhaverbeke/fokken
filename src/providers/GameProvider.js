import React, { useCallback, useMemo, useState } from 'react';

import useSocket from '@/hooks/useSocket';
import validMoves from '@/utils/validMoves';

export const GameContext = React.createContext({});

const GameContextProvider = ({ children }) => {
  const [isHosting, setIsHosting] = useState(false);
  const [playerInfo, setPlayerInfo] = useState({});
  const [gameInfo, setGameInfo] = useState({
    isStarted: false,
    otherPlayers: [],
    turn: undefined,
    drawPileAmount: 0,
  });

  const [hand, setHand] = useState([]);

  const [table, setTable] = useState([[], [], []]);

  const [otherPlayerCards, setOtherPlayerCards] = useState({});

  const isTurn = gameInfo.isStarted && playerInfo.id === gameInfo.turn;

  const [playedCards, setPlayedCards] = useState([]);

  const setOtherPlayersStacks = useCallback(
    (newStack, id) => {
      setOtherPlayerCards((prev) => ({ ...prev, [id]: newStack }));
    },
    [setOtherPlayerCards],
  );

  const socket = useSocket({
    playerInfo,
    setGameInfo,
    setHand,
    setTable,
    setPlayerInfo,
    setOtherPlayerCards,
    setPlayedCards,
  });

  const canPlayFromTable = hand.length === 0;

  const canPlayHiddenFromTable = table.flat().length <= 3;

  const hasNoMoves =
    (!canPlayFromTable &&
      !canPlayHiddenFromTable &&
      containsValidCards(hand, playedCards)) ||
    (canPlayFromTable &&
      !canPlayHiddenFromTable &&
      containsValidCards(table.map((tableStack) => tableStack[0]))) ||
    (canPlayHiddenFromTable &&
      containsValidCards(table.map((tableStack) => tableStack[0])));

  // info should be an object here
  const updatePlayerInfo = useCallback(
    (newInfo) => setPlayerInfo((prev) => ({ ...prev, ...newInfo })),
    [],
  );

  // plays a card
  const playCards = useCallback(
    (cards) => {
      // Cannot play when not your turn
      if (!isTurn) {
        return;
      }

      const playedCards = Array.isArray(cards) ? cards : [cards];

      socket.emit('PLAY_CARD', JSON.stringify(playedCards));
    },
    [isTurn, socket],
  );

  const startGame = useCallback(() => {
    socket.emit('START_GAME');
  }, [socket]);

  const context = useMemo(
    () => ({
      playerInfo,
      playedCards,
      hand,
      table,
      updatePlayerInfo,
      canPlayFromTable,
      canPlayHiddenFromTable,
      playCards,
      otherPlayerCards,
      setOtherPlayersStacks,
      startGame,
      gameInfo,
      setPlayerInfo,
      isHosting,
      setIsHosting,
      isTurn,
    }),
    [
      playerInfo,
      playedCards,
      hand,
      table,
      updatePlayerInfo,
      canPlayFromTable,
      canPlayHiddenFromTable,
      playCards,
      otherPlayerCards,
      setOtherPlayersStacks,
      gameInfo,
      startGame,
      setPlayerInfo,
      isHosting,
      setIsHosting,
      isTurn,
    ],
  );

  return (
    <GameContext.Provider value={context}>{children}</GameContext.Provider>
  );
};

export default GameContextProvider;
