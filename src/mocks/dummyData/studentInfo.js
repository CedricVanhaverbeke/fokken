import faker from 'faker';

export default Array.from(Array(100), (_, i) => ({
  id: i,
  submittedAt: faker.date.past().toISOString(),
}));
