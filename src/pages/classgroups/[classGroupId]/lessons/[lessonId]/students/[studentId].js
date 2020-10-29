import React from 'react';
import { Content, PageHeader, PageTitle } from '@ftrprf/tailwind-components';

import QuestionResult from '@/components/pages/StudentAnswers/QuestionResult';
import useClassGroupLessonStudent, {
  fetchClassGroupLessonStudent,
} from '@/hooks/api/useClassGroupLessonStudent';
import useClassGroupStudents, {
  fetchClassGroupStudents,
} from '@/hooks/api/useClassGroupStudents';
import useLesson, { fetchLesson } from '@/hooks/api/useLesson';
import useLessonAnswers, {
  fetchLessonAnswers,
} from '@/hooks/api/useLessonAnswers';
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
  initialLessonAnswers,
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

  const { lessonQuestions } = useLessonQuestions(
    lessonId,
    initialLessonQuestions,
  );

  const { lessonAnswers } = useLessonAnswers(
    classGroupId,
    lessonId,
    studentId,
    initialLessonAnswers,
  );

  const selectedStudent = classGroupStudents.find(
    (student) => student.id === studentId,
  );

  const questionSlides = lessonQuestions.slides.filter(
    (slide) => !!slide.question,
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
      <Content>
        <div className="flex flex-col gap-y-2">
          {questionSlides.map(({ question, content }, i) => (
            <div className="flex gap-x-4 mb-4" key={question.id}>
              <span className="flex-shrink-0">Vraag {i + 1}</span>
              <div className="flex flex-col flex-grow gap-y-8">
                <div>{content}</div>
                <QuestionResult
                  question={question}
                  givenAnswer={lessonAnswers[question.id]}
                />
              </div>
            </div>
          ))}
        </div>
      </Content>
    </>
  );
};

export async function getServerSideProps({
  params: { classGroupId, lessonId, studentId },
  query: { viewMode },
}) {
  const [
    initialLesson,
    initialClassGroupStudents,
    initialClassGroupLessonStudent,
    initialLessonQuestions,
    initialLessonAnswers,
  ] = await Promise.all([
    fetchLesson(lessonId),
    fetchClassGroupStudents(classGroupId),
    fetchClassGroupLessonStudent(classGroupId, lessonId),
    fetchLessonQuestions(lessonId),
    fetchLessonAnswers(classGroupId, lessonId, studentId),
  ]);

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
      initialLessonAnswers,
    },
  };
}

export default StudentAnswers;
