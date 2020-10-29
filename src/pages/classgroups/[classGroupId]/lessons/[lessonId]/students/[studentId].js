import React from 'react';
import { PageHeader, PageTitle } from '@ftrprf/tailwind-components';

import useClassGroupLessonStudent, {
  fetchClassGroupLessonStudent,
} from '@/hooks/api/useClassGroupLessonStudent';
import useClassGroupStudents, {
  fetchClassGroupStudents,
} from '@/hooks/api/useClassGroupStudents';
import useLesson, { fetchLesson } from '@/hooks/api/useLesson';
import useLessonQuestions, {
  fetchLessonQuestions,
} from '@/hooks/api/useLessonQuestions';

const StudentAnswers = ({
  classGroupId,
  lessonId,
  studentId,
  initialLesson,
  initialClassGroupStudents,
  initialClassGroupLessonStudent,
  initialLessonQuestions,
}) => {
  const { classGroupStudents } = useClassGroupStudents(
    classGroupId,
    initialClassGroupStudents,
  );

  const { lessonDetails } = useLesson(lessonId, initialLesson);
  // eslint-disable-next-line no-unused-vars
  const { classGroupLessonStudent } = useClassGroupLessonStudent(
    classGroupId,
    lessonId,
    initialClassGroupLessonStudent,
  );

  // eslint-disable-next-line no-unused-vars
  const { lessonQuestions } = useLessonQuestions(
    lessonId,
    initialLessonQuestions,
  );

  const selectedStudent = classGroupStudents.find(
    (student) => student.id === studentId,
  );

  return (
    <>
      <PageHeader>
        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-y-2">
            <span className="text-xl font-medium text-gray-600">
              Resultaten
            </span>
            <PageTitle>{lessonDetails.title}</PageTitle>
          </div>
          <span>{`${selectedStudent.firstName} ${selectedStudent.lastName}`}</span>
        </div>
      </PageHeader>
      <div />
    </>
  );
};

export async function getServerSideProps({
  params: { classGroupId, lessonId, studentId },
  query: { viewMode },
}) {
  const initialLesson = await fetchLesson(lessonId);
  const initialClassGroupStudents = await fetchClassGroupStudents(classGroupId);
  const initialClassGroupLessonStudent = await fetchClassGroupLessonStudent(
    classGroupId,
    lessonId,
  );
  const initialLessonQuestions = await fetchLessonQuestions(lessonId);

  return {
    props: {
      classGroupId,
      lessonId,
      studentId,
      viewMode,
      initialLesson,
      initialClassGroupStudents,
      initialClassGroupLessonStudent,
      initialLessonQuestions,
    },
  };
}

export default StudentAnswers;
