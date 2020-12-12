const determineRelativeOrder = (order, ownIndex) => {
  const relativeOrder = Array(order.length).fill(0);
  order.forEach((entry, i) => {
    const newIndex =
      i === ownIndex
        ? 0
        : i <= ownIndex
        ? order.length - ownIndex + i
        : i - ownIndex;

    relativeOrder[newIndex] = entry;
  });

  return relativeOrder;
};

export default determineRelativeOrder;
