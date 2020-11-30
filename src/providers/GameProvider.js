import React, { useMemo, useState, useEffect } from 'react';
import { useCallback } from 'react';

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

  const [canPlayFromTable, setCanPlayFromTable] = useState(false);

  const [playerInfo, setPlayerInfo] = useState({});

  // Keeps the cards in hand and which cards are on the table
  // table contains an array of three arrays, each representing a stack on the table
  const [playableCards, setPlayableCards] = useState({
    hand: [
      { number: 1, suit: 0 },
      { number: 2, suit: 1 },
      { number: 3, suit: 2 },
      { number: 4, suit: 1 },
      { number: 5, suit: 3 },
      { number: 10, suit: 0 },
    ],
    table: [
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
    ],
  });

  useEffect(() => {
    setCanPlayFromTable(playableCards.hand.length === 0);
    console.log(playableCards.hand.length === 0);
  }, [playableCards]);

  // info should be an object here
  const updatePlayerInfo = useCallback(
    (newInfo) => setPlayerInfo((prev) => ({ ...prev, ...newInfo })),
    [],
  );

  // plays a card
  const playCard = useCallback(
    (fromHand, number, suit, { handIndex, stackIndex }) => {
      console.log({ fromHand, canPlayFromTable });
      if (!fromHand && !canPlayFromTable) {
        console.log('Cannot play from table');
        return;
      }

      setPlayableCards(({ hand, table }) => {
        let newHand = hand;
        let newTable = table;
        if (fromHand) {
          newHand.splice(handIndex, 1);
        } else {
          newTable[stackIndex].pop();
        }
        return { hand: newHand, table: newTable };
      });

      setPlayedCards((prev) => [...prev, { number, suit }]);
    },
    [],
  );

  const context = useMemo(() => ({
    playerInfo,
    playedCards,
    playableCards,
    updatePlayerInfo,
    canPlayFromTable,
    playCard,
  }));

  return (
    <GameContext.Provider value={context}>{children}</GameContext.Provider>
  );
};

export default GameContextProvider;
