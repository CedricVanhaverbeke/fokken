import faker from 'faker';

export const classGroupDetails = {
  name: '1A',
};

export const classGroupLesson = {
  id: 'd49515ed-972c-11e9-b935-0a0034000161',
  publishStatus: 'OPEN_FOR_HOME',
  updatedAt: '2019-01-01T00:00:00.000+0100',
  resultsPublished: false,
  givenOn: null,
  givenBy: null,
};

export const classGroupStudents = Array.from(Array(20), (_, i) => ({
  id: i,
  username: faker.internet.userName(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  lastLogin: faker.date.past().toISOString(),
  idp: 'FTRPRF',
  role: 'SCHOOLSTUDENT',
  schoolId: faker.random.uuid(),
}));
