import faker from 'faker';

export const lessonDetails = {
  id: 'd49515ed-972c-11e9-b935-0a0029000023',
  lessonContentId: 955,
  title: '(a)Sociale media',
  defaultPublishStatus: 'CLOSED',
  sequence: 0,
  document: null,
};

const generateLessonQuestions = () => {
  faker.seed(69);

  return {
    archived: faker.random.boolean(),
    centurySkills: [],
    id: 1000,
    published: faker.random.boolean(),
    slides: Array.from(Array(10), (_, i) => ({
      content: faker.lorem.paragraph(),
      id: i,
      lessonId: 1000,
      module: 'NORMAL',
      question: {
        id: 100 + i,
        questionAnswers: Array.from(Array(4), (_, i) => ({
          id: 200 + i,
          track: true,
          value: faker.lorem.sentence(),
          correct: faker.random.boolean(),
        })),
      },
    })),
  };
};

const generateLessonAnswers = () => {
  faker.seed(69);

  return Array.from(Array(10), (_, i) => ({
    id: faker.random.uuid(),
    lessonContentId: faker.random.uuid(),
    answerType: 'MULTIPLECHOICE',
    questionId: 100 + i,
    userId: faker.random.uuid(),
    answers: Array.from(Array(2), () => ({
      id: faker.random.uuid(),
      multipleChoiceAnswerId: 200 + (Math.ceil(Math.random() * 10) % 4),
    })),
    submittedAt: faker.date.past().toISOString(),
  }));
};

export const lessonAnswers = generateLessonAnswers();
export const lessonQuestions = generateLessonQuestions();
