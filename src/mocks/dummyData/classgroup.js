import faker from 'faker';

export default Array.from(Array(100), (_, i) => ({
  id: i,
  username: faker.internet.userName(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  lastLogin: faker.date.past().toISOString(),
  idp: 'FTRPRF',
  role: 'SCHOOLSTUDENT',
  schoolId: faker.random.uuid(),
}));
