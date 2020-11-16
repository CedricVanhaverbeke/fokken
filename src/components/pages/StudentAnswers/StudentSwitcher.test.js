import { fireEvent } from '@testing-library/react';

import StudentSwitcher from './StudentSwitcher';

import { render } from '@/tests/utils';
import { sortByLastNameAndFirstName } from '@/utils/sort';

import { classGroupLessonStudents } from '@/mocks/mockData/classGroup';

const mockPush = jest.fn();
const mockViewMode = 'CLASSICAL';
const mockClassGroupId = 1;
const mockLessonId = 1;
const mockStudentId = '1';

const submittedStudents = sortByLastNameAndFirstName(
  classGroupLessonStudents.filter((s) => !!s.submittedAt),
);

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
    query: {
      classGroupId: mockClassGroupId,
      lessonId: mockLessonId,
      studentId: mockStudentId,
      viewMode: mockViewMode,
    },
  }),
}));

afterEach(() => jest.resetAllMocks());

describe('StudentSwitcher', () => {
  it('Should only show students that submitted an answer', async () => {
    const { findAllByTestId } = render(<StudentSwitcher />);

    const options = await findAllByTestId('dropdown-option');

    expect(options.length).toEqual(submittedStudents.length);
  });

  it('Should navigate to a new page when clicked on a student in the dropdown', () => {
    const { getByTestId } = render(<StudentSwitcher />);

    fireEvent.change(getByTestId('dropdown'), {
      target: { value: `option${submittedStudents[1].id}` },
    });

    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush.mock.calls[0][0]).toEqual({
      pathname: `/classgroups/${mockClassGroupId}/lessons/${mockLessonId}/students/`,
      query: { viewMode: mockViewMode },
    });
  });

  it('Should navigate to to next student when clicking on the next button', () => {
    const { getByRole, userEvent } = render(<StudentSwitcher />);

    const currentIndex = submittedStudents.findIndex(
      (s) => s.id === mockStudentId,
    );

    const nextStudentId = submittedStudents[currentIndex + 1].id;

    userEvent.click(getByRole('nextButton'));
    expect(mockPush.mock.calls[0][0]).toEqual({
      pathname: `/classgroups/${mockClassGroupId}/lessons/${mockLessonId}/students/${nextStudentId}`,
      query: { viewMode: mockViewMode },
    });
  });

  it('Should navigate to the previous student when clicking on the previous button', () => {
    const { getByRole, userEvent } = render(<StudentSwitcher />);

    const currentIndex = submittedStudents.findIndex(
      (s) => s.id === mockStudentId,
    );

    const previousStudentId = submittedStudents[currentIndex - 1].id;

    userEvent.click(getByRole('previousButton'));
    expect(mockPush.mock.calls[0][0]).toEqual({
      pathname: `/classgroups/${mockClassGroupId}/lessons/${mockLessonId}/students/${previousStudentId}`,
      query: { viewMode: mockViewMode },
    });
  });
});
