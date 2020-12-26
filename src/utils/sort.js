export const sortByLastNameAndFirstName = (data, ascending = true) => {
  const order = ascending ? [-1, 1] : [1, -1];

  return data.sort((s1, s2) => {
    if (s1.lastName < s2.lastName) return order[0];
    if (s1.lastName > s2.lastName) return order[1];
    if (s1.firstName < s2.firstName) return order[0];
    if (s1.firstName > s2.firstName) return order[1];
    return 0;
  });
};

const symbolMapper = {
  J: 11,
  Q: 12,
  K: 13,
};

export const sortCards = (cards) =>
  cards.sort(
    (a, b) =>
      (symbolMapper[a.number] ?? a.number) -
      (symbolMapper[b.number] ?? b.number),
  );
