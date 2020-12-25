import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import determineRelativeOrder from '@/utils/determineRelativeOrder';

const useSocket = ({
  playerInfo,
  setGameInfo,
  setHand,
  setTable,
  setPlayerInfo,
  setOtherPlayerCards,
  setPlayedCards,
}) => {
  const [socket, setSocket] = useState();

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
        const responseObject = JSON.parse(response);
        const newUsers = Array.isArray(responseObject)
          ? responseObject
          : [responseObject];

        setGameInfo((prev) => ({
          ...prev,
          otherPlayers: [
            ...prev.otherPlayers,
            ...newUsers.map((user) => user.userName),
          ],
        }));
      });

      socket.on('DIVIDED_CARDS', (response) => {
        const {
          order,
          assignedId,
          turn,
          drawPileAmount,
          ...dividedCards
        } = JSON.parse(response);

        const { hand, table } = dividedCards[assignedId];
        setHand(hand);
        setTable(table);
        setPlayerInfo((prev) => ({ ...prev, id: assignedId }));
        setGameInfo((prev) => ({
          ...prev,
          isStarted: true,
          turn,
          drawPileAmount,
        }));
        const relativeOrder = determineRelativeOrder(
          order,
          order.findIndex(({ id }) => id === assignedId),
        );

        // You are always the first person in the relative order
        const [_me, ...playerOrder] = relativeOrder;

        setOtherPlayerCards(
          Object.fromEntries(
            playerOrder.map(({ id }, i) => [
              i,
              { ...dividedCards[id], ...playerOrder[i] },
            ]),
          ),
        );
      });

      socket.on('CARD_PLAYED', (response) => {
        const { number, suit, turn, drawPileAmount, ...newCards } = JSON.parse(
          response,
        );

        const { [socket.id]: ownCards, ...otherNewCards } = newCards;

        setPlayedCards((prev) => [...prev, { number, suit }]);
        setGameInfo((prev) => ({ ...prev, turn, drawPileAmount }));
        setHand(ownCards.hand);
        setTable(ownCards.table);

        // set other player cards
        setOtherPlayerCards((prev) =>
          Object.fromEntries(
            Object.entries(prev).map(([index, player]) => {
              return [
                index,
                {
                  ...player,
                  hand: otherNewCards[player.id].hand,
                  table: otherNewCards[player.id].table,
                },
              ];
            }),
          ),
        );
      });
    }

    return () => socket?.disconnect();
  }, [
    socket,
    playerInfo.name,
    setGameInfo,
    setHand,
    setTable,
    setPlayerInfo,
    setOtherPlayerCards,
    setPlayedCards,
  ]);

  return socket;
};

export default useSocket;
