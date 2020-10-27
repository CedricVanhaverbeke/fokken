import faker from 'faker';

export default Array.from(Array(20), (_, i) => ({
  id: i,
  submittedAt: Math.random() < 0.2 ? null : faker.date.past().toISOString(),
}));
