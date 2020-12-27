import React, { useCallback, useMemo, useState } from 'react';

import useSocket from '@/hooks/useSocket';

import hasMoves from '@/utils/hasMoves';

export const GameContext = React.createContext({});

const GameContextProvider = ({ children }) => {
  const [isHosting, setIsHosting] = useState(false);
  const [playerInfo, setPlayerInfo] = useState({});
  const [gameInfo, setGameInfo] = useState({
    isStarted: false,
    otherPlayers: [],
    turn: undefined,
    drawPileAmount: 0,
    playedAmount: undefined,
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

  const playerHasMoves = useMemo(() => {
    return hasMoves({
      canPlayFromTable,
      canPlayHiddenFromTable,
      hand,
      table,
      playedCards,
    });
  }, [canPlayFromTable, canPlayHiddenFromTable, hand, table, playedCards]);

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

      // Put this here so we deny the possibility of taking the cards when you just played
      setGameInfo((prev) => ({ ...prev, turn: undefined }));

      const playedCards = Array.isArray(cards) ? cards : [cards];

      socket.emit('PLAY_CARD', JSON.stringify(playedCards));
    },
    [isTurn, socket],
  );

  const startGame = useCallback(() => {
    socket.emit('START_GAME');
  }, [socket]);

  const takePlayedCards = useCallback(
    (payload) => {
      socket.emit(
        'TAKE_PLAYED_CARDS',
        JSON.stringify(payload ? payload : { passTurn: true }),
      );
    },
    [socket],
  );

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
      setGameInfo,
      takePlayedCards,
      setPlayerInfo,
      isHosting,
      setIsHosting,
      isTurn,
      playerHasMoves,
    }),
    [
      playerHasMoves,
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
      setGameInfo,
      takePlayedCards,
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
