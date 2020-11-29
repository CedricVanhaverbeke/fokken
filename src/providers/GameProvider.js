import React, { useMemo, useState } from 'react';
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
  // the game's id
  const [id, setId] = useState();

  const [playedCards, setPlayedCards] = useState([]);

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

  const canPlayFromTable = playableCards.hand.length === 0;

  // contains all the players of the game, with their id and the cards on the table
  const [players, setPlayers] = useState({});

  // Keeps which player's turn it is
  const [turn, setTurn] = useState();

  // info should be an object here
  const updatePlayerInfo = useCallback(
    (newInfo) => setPlayerInfo((prev) => ({ ...prev, ...newInfo })),
    [],
  );

  // plays a card
  const playCard = useCallback((fromHand, card) => {
    if (!fromHand && canPlayFromTable) {
      console.log('Cannot play from table');
      return;
    }
    // add card
  }, []);

  const context = useMemo(() => ({
    playerInfo,
    playedCards,
    playableCards,
    updatePlayerInfo,
    isTurn: turn === playerInfo?.id,
    canPlayFromTable,
    playCard,
    players,
  }));

  return (
    <GameContext.Provider value={context}>{children}</GameContext.Provider>
  );
};

export default GameContextProvider;
