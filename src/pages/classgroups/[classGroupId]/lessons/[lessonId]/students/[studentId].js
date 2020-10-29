import React from 'react';
import { PageHeader, PageTitle } from '@ftrprf/tailwind-components';

import useLesson, { fetchLesson } from '@/hooks/api/useLesson';
import useClassGroupLessonStudent, {
  fetchClassGroupLessonStudent,
} from '@/hooks/api/useClassGroupLessonStudent';
import useClassGroupStudents, {
  fetchClassGroupStudents,
} from '@/hooks/api/useClassGroupStudents';

const StudentAnswers = ({
  classGroupId,
  lessonId,
  studentId,
  viewMode,
  initialLesson,
  initialClassGroupStudents,
  initialClassGroupLessonStudent,
}) => {
  const { classGroupStudents } = useClassGroupStudents(
    classGroupId,
    initialClassGroupStudents,
  );

  const { lessonDetails } = useLesson(lessonId, initialLesson);
  const { classGroupLessonStudent } = useClassGroupLessonStudent(
    classGroupId,
    lessonId,
    initialClassGroupLessonStudent,
  );

  const selectedStudent = classGroupStudents.find(
    (student) => student.id === studentId,
  );

  console.log({ studentId, classGroupStudents, selectedStudent });

  return (
    <>
      <PageHeader>
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <div className="text-lg">Resultaten</div>
            <PageTitle>{lessonDetails.title}</PageTitle>
          </div>
          <span>{`${selectedStudent.firstName} ${selectedStudent.lastName}`}</span>
        </div>
      </PageHeader>
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

  return {
    props: {
      classGroupId,
      lessonId,
      studentId,
      viewMode,
      initialLesson,
      initialClassGroupStudents,
      initialClassGroupLessonStudent,
    },
  };
}

export default StudentAnswers;
