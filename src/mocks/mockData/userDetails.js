import faker from 'faker';

export default {
  username: faker.internet.userName(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
};
