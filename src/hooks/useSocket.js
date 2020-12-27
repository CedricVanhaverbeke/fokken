import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { io } from 'socket.io-client';

import determineRelativeOrder from '@/utils/determineRelativeOrder';
import { sortCards } from '@/utils/sort';

const useSocket = ({
  playerInfo,
  setGameInfo,
  setHand,
  setTable,
  setPlayerInfo,
  setOtherPlayerCards,
  setPlayedCards,
}) => {
  const router = useRouter();
  const { gameId } = router.query;

  const [socket, setSocket] = useState();

  useEffect(() => {
    if (!socket && playerInfo.name && gameId) {
      const socket = io('localhost:8000', {
        query: {
          userName: playerInfo.name,
          roomId: gameId,
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
        setHand(sortCards(hand));
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
        // eslint-disable-next-line no-unused-vars
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
        const {
          turn,
          drawPileAmount,
          playedCards,
          message,
          playedAmount,
          playerIsOut,
          ...newCards
        } = JSON.parse(response);

        const { [socket.id]: ownCards, ...otherNewCards } = newCards;

        setPlayedCards(playedCards);
        setGameInfo((prev) => ({
          ...prev,
          turn,
          drawPileAmount,
          message: playerIsOut === socket.id ? 'CONGRATZZZ' : message,
          playedAmount,
          youWon: playerIsOut === playerInfo.id,
        }));
        setHand(sortCards(ownCards.hand));
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

      socket.on('EMPTY_STACK', (payload) => {
        const { turn, message } = JSON.parse(payload);
        setGameInfo((prev) => ({ ...prev, turn, message }));
        setPlayedCards([]);
      });
    }

    return () => socket?.disconnect();
  }, [
    gameId,
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
