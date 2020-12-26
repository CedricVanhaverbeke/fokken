// There are essentially two rules:
// Always play higher cards
// You can lay any number of cards you want.
// This function returns an array of the cards you can put on the stack. These cards will be enabled in your hand

// Function receives a card with a number. Only the number is important

const specialCards = [2, 9, 10];
const HIGHEST_CARD = 13;

const symbolMapper = {
  J: 11,
  Q: 12,
  K: 13,
};

const numberMapper = {
  11: 'J',
  12: 'Q',
  13: 'K',
};

const validMoves = (playedCards) => {
  if (playedCards.length === 0) {
    return [
      ...new Set([
        ...Array.from(
          Array(HIGHEST_CARD - 0),
          (_, i) => numberMapper[i + 1] || i + 1,
        ),
        ...specialCards,
      ]),
    ];
  }

  let { number } = playedCards[playedCards.length - 1];
  const previousCard = playedCards[playedCards.length - 2];

  const previousNumber = previousCard ? previousCard.number : 0;

  if (number === 7) {
    return [...new Set([1, 2, 3, 4, 5, 6, 7, ...specialCards])];
  }

  if (number === 9) {
    number = previousNumber;
  }

  const numberOrSymbol = symbolMapper[number] || number;

  return [
    ...new Set([
      ...Array.from(
        Array(HIGHEST_CARD - numberOrSymbol),
        (_, i) =>
          numberMapper[i + 1 + numberOrSymbol] || i + 1 + numberOrSymbol,
      ),
      ...specialCards,
    ]),
  ];
};

export default validMoves;
