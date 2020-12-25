import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import determineRelativeOrder from '@/utils/determineRelativeOrder';

const useSocket = ({
  playerInfo,
  setGameInfo,
  setHand,
  setTable,
  setPlayerInfo,
  setOtherPlayerCardsTable,
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
        setGameInfo((prev) => ({ ...prev, isStarted: true, turn: turn }));
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
  }, [
    socket,
    playerInfo.name,
    setGameInfo,
    setHand,
    setTable,
    setPlayerInfo,
    setOtherPlayerCardsTable,
  ]);

  return socket;
};

export default useSocket;
