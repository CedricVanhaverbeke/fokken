import { renderPage } from '../utils';

import { classGroupLessonStudents } from '@/mocks/mockData/classGroup';
import { lessonDetails } from '@/mocks/mockData/lesson';

const URL = '/classgroups/:classGroupId/lessons/:lessonId/students/:studentId';

describe('StudentAnswers', () => {
  it('Should show a skeleton when loading the data', async () => {
    const { queryByText, router, queryAllByRole } = await renderPage(URL);

    const selectedStudent = classGroupLessonStudents.find(
      ({ id }) => id === `${router.query.studentId}`,
    );

    expect(queryByText('student-answers.title.results')).toBeNull();
    expect(queryByText(lessonDetails.title)).toBeNull();
    expect(
      queryByText(`${selectedStudent.firstName} ${selectedStudent.lastName}`),
    ).toBeNull();

    expect(queryByText(/student-answers.question_label.*1/)).toBeNull();
    expect(queryAllByRole('loading')).toBeDefined();
  });
});
