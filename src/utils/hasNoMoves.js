import validMoves from './validMoves';

const containsValidCards = (cards, playedCards) =>
  !!cards.find((card) =>
    validMoves(playedCards).some((validNumber) => card.number === validNumber),
  );

const hasNoMoves = ({
  canPlayFromTable,
  canPlayHiddenFromTable,
  hand,
  table,
  playedCards,
}) => {
  if (!canPlayFromTable && !canPlayHiddenFromTable) {
    return containsValidCards(hand, playedCards);
  }

  // If the array contains only one card, we cannot count it in the first row
  if (canPlayFromTable && !canPlayHiddenFromTable) {
    return containsValidCards(
      table
        .filter((tableStack) => tableStack.length > 1) // filter out cards
        .map((tableStack) => tableStack[0]), // get first card
      playedCards,
    );
  }

  // always returns undefined, since players do not know
  if (canPlayHiddenFromTable) {
    return undefined;
  }

  return false;
};

export default hasNoMoves;
