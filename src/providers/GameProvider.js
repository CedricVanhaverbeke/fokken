import React, { useCallback, useMemo, useState } from 'react';

import useSocket from '@/hooks/useSocket';

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

  // info should be an object here
  const updatePlayerInfo = useCallback(
    (newInfo) => setPlayerInfo((prev) => ({ ...prev, ...newInfo })),
    [],
  );

  // plays a card
  const playCard = useCallback(
    (fromHand, number, suit, { handIndex, stackIndex, isHidden = true }) => {
      // Cannot play when not your turn
      if (!isTurn) {
        return;
      }

      // Prevent playing a card from the table when you have cards in your hand
      if (!canPlayFromTable && !fromHand) {
        // TODO: notification or something
        // eslint-disable-next-line no-console
        console.log(' Cannot play from table right now');
        return;
      }

      // Prevent playing a hidden card from the table when you have visible cards on the table
      if (!fromHand && isHidden && !canPlayHiddenFromTable) {
        // eslint-disable-next-line no-console
        console.log(' Cannot play from hidden stack right now');
        return;
      }

      socket.emit('PLAY_CARD', JSON.stringify({ number, suit }));
    },
    [canPlayFromTable, canPlayHiddenFromTable, isTurn, socket],
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
      playCard,
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
      playCard,
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
