import React, {
  useMemo,
  useEffect,
  useState,
  useCallback,
  useContext,
} from 'react';
import { io } from 'socket.io-client';
import { useRouter } from 'next/router';

import determineRelativeOrder from '@/utils/determineRelativeOrder';

export const GameContext = React.createContext({});

const GameContextProvider = ({ children }) => {
  const [playerInfo, setPlayerInfo] = useState({});
  const [gameInfo, setGameInfo] = useState({
    isStarted: false,
    otherPlayers: [],
  });
  const [hand, setHand] = useState([]);
  const [table, setTable] = useState([[], [], []]);
  const [socket, setSocket] = useState();

  const [otherPlayerCardsTable, setOtherPlayerCardsTable] = useState({});

  useEffect(() => {
    if (!socket && playerInfo.name) {
      const socket = io('localhost:8000', {
        query: {
          userName: playerInfo.name,
          roomId: 123,
        },
      });

      setSocket(socket);

      socket.on('NEW_PLAYER', (response) => {
        console.log('new player arrived!');
        console.log(response);
      });

      socket.on('DIVIDED_CARDS', (response) => {
        const { order, assignedId, ...dividedCards } = JSON.parse(response);
        const { hand, table } = dividedCards[assignedId];
        setHand(hand);
        setTable(table);
        setPlayerInfo((prev) => ({ ...prev, id: assignedId }));
        setGameInfo((prev) => ({ ...prev, isStarted: true }));
        const relativeOrder = determineRelativeOrder(
          order,
          order.findIndex(({ id }) => id === assignedId),
        );

        setOtherPlayerCardsTable(
          Object.fromEntries(
            relativeOrder.map(({ id }, i) => [
              i,
              { ...dividedCards[id], ...relativeOrder[i] },
            ]),
          ),
        );
      });
    }

    return () => socket?.disconnect();
  }, [socket, playerInfo.name]);

  const [playedCards, setPlayedCards] = useState([]);

  const setOtherPlayersStacks = useCallback(
    (newStack, id) => {
      setOtherPlayerCardsTable((prev) => ({ ...prev, [id]: newStack }));
    },
    [setOtherPlayerCardsTable],
  );

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
      // Prevent playing a card from the table when you have cards in your hand
      if (!canPlayFromTable && !fromHand) {
        // TODO: notification or something
        console.log(' Cannot play from table right now');
        return;
      }

      // Prevent playing a hidden card from the table when you have visible cards on the table
      if (!fromHand && isHidden && !canPlayHiddenFromTable) {
        console.log(' Cannot play from hidden stack right now');
        return;
      }

      if (fromHand) {
        setHand((prevHand) => {
          prevHand.splice(handIndex, 1);
          return prevHand;
        });
      } else {
        setTable((prevTable) => {
          prevTable[stackIndex].shift();
          return prevTable;
        });
      }

      setPlayedCards((prev) => [...prev, { number, suit }]);
    },
    [canPlayFromTable, canPlayHiddenFromTable],
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
      otherPlayerCardsTable,
      setOtherPlayersStacks,
      startGame,
      gameInfo,
      setPlayerInfo,
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
      otherPlayerCardsTable,
      setOtherPlayersStacks,
      gameInfo,
      startGame,
      setPlayerInfo,
    ],
  );

  return (
    <GameContext.Provider value={context}>{children}</GameContext.Provider>
  );
};

export default GameContextProvider;
