import { useState } from 'react';

const getId = (card) => {
  return `card${card.number}${card.suit}`;
};

const useMultiSelection = () => {
  const [selection, setSelection] = useState({});

  // create id from the combination of number and suit, since it's unique
  const toggleSelected = (card) => {
    if (selection[getId(card)]) {
      setSelection((prev) => {
        // eslint-disable-next-line no-unused-vars
        const { [getId(card)]: _previousCard, ...notRemovedCards } = prev;
        return notRemovedCards;
      });
      return;
    }

    setSelection({ ...selection, [getId(card)]: card });
  };

  const isSelected = (card) => {
    return !!selection[getId(card)];
  };

  const selectionContainsNumber = (number) => {
    return (
      !!selection[`card${number}0`] ||
      !!selection[`card${number}1`] ||
      !!selection[`card${number}2`] ||
      !!selection[`card${number}3`]
    );
  };

  return {
    selection: Object.values(selection),
    toggleSelected,
    isSelected,
    selectionContainsNumber,
    emptySelection: () => setSelection({}),
  };
};

export default useMultiSelection;
