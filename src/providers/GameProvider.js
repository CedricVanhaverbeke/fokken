import React, { useMemo, useState, useEffect } from 'react';
import { useCallback } from 'react';

const mockStackCards = [
  [
    { number: 1, suit: 0 },
    { number: 2, suit: 1 },
  ],
  [
    { number: 1, suit: 0 },
    { number: 2, suit: 1 },
  ],
  [
    { number: 1, suit: 0 },
    { number: 2, suit: 1 },
  ],
];

/* 
    Holds the state of the app:
    1. The player info : its uuid, name and possibly photo in the future
    2. The game id, no reason to export it in the context
    2. Whose turn it is in the game: also an additional isTurn variable
    3. Keeps track of the cards in your hand and on the table
       - Adds a variable canPlayFromTable
    4. The action of placing a card
*/

export const GameContext = React.createContext({});

const GameContextProvider = ({ children }) => {
  const [playedCards, setPlayedCards] = useState([]);
  const [hand, setHand] = useState([
    { number: 'K', suit: 0 },
    { number: 'J', suit: 1 },
    { number: 'Q', suit: 2 },
    { number: 4, suit: 1 },
    { number: 5, suit: 3 },
    { number: 10, suit: 0 },
  ]);
  const [table, setTable] = useState(
    JSON.parse(JSON.stringify(mockStackCards)),
  );

  const [otherPlayerCardsTable, setOtherPlayerCardsTable] = useState({
    1: JSON.parse(JSON.stringify(mockStackCards)),
    2: JSON.parse(JSON.stringify(mockStackCards)),
    3: JSON.parse(JSON.stringify(mockStackCards)),
    4: JSON.parse(JSON.stringify(mockStackCards)),
    5: JSON.parse(JSON.stringify(mockStackCards)),
    6: JSON.parse(JSON.stringify(mockStackCards)),
  });

  const setOtherPlayersStacks = useCallback(
    (newStack, id) => {
      setOtherPlayerCardsTable((prev) => ({ ...prev, [id]: newStack }));
    },
    [setOtherPlayerCardsTable],
  );

  const canPlayFromTable = hand.length === 0;

  const canPlayHiddenFromTable = table.flat().length <= 3;

  const [playerInfo, setPlayerInfo] = useState({});

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
    ],
  );

  return (
    <GameContext.Provider value={context}>{children}</GameContext.Provider>
  );
};

export default GameContextProvider;
