// There are essentially two rules:
// Always play higher or equal cards
// You can play any number of cards you want.
// This function returns an array of the cards you can put on the stack. These cards will be enabled in your hand

// Function receives a card with a number. Only the number is important

const specialCards = [2, 9, 10];
const HIGHEST_CARD = 13;
const LOWEST_CARD = 2;
const ACE = 1;

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
    // return every card when there are no playedCards yet
    return [
      ...new Set([
        ACE,
        ...Array.from(
          Array(HIGHEST_CARD - 1),
          (_, i) => numberMapper[i + LOWEST_CARD] || i + LOWEST_CARD,
        ),
        ...specialCards,
      ]),
    ];
  }

  let { number } = playedCards[playedCards.length - 1];
  const previousCard = playedCards[playedCards.length - 2];

  const previousNumber = previousCard ? previousCard.number : 1;

  if (number === 7) {
    return [...new Set([2, 3, 4, 5, 6, 7, ...specialCards])];
  }

  // ace
  if (number === 1) {
    return [ACE, ...specialCards];
  }

  if (number === 9) {
    number = previousNumber;
  }

  const numberOrSymbol = symbolMapper[number] || number;

  return [
    ...new Set([
      ACE,
      ...Array.from(
        Array(HIGHEST_CARD - numberOrSymbol + 1),
        (_, i) => numberMapper[i + numberOrSymbol] || i + numberOrSymbol,
      ),
      ...specialCards,
    ]),
  ];
};

export default validMoves;
