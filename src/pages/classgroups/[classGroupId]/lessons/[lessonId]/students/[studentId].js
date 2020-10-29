import React from 'react';

import { Content, PageHeader, PageTitle } from '@ftrprf/tailwind-components';

import fetcher from '@/hooks/api/index';
import useClassGroupLessonStudent from '@/hooks/api/useClassGroupLessonStudent';
import useLesson from '@/hooks/api/useLesson';
import useLessonAnswers from '@/hooks/api/useLessonAnswers';
import useLessonQuestions from '@/hooks/api/useLessonQuestions';

import QuestionResult from '@/components/pages/StudentAnswers/QuestionResult';

const StudentAnswers = ({
  classGroupId,
  lessonId,
  studentId,
  initialLesson,
  initialClassGroupLessonStudents,
  initialLessonQuestions,
  initialLessonAnswers,
}) => {
  const { lessonDetails } = useLesson(lessonId, initialLesson);

  const { classGroupLessonStudent } = useClassGroupLessonStudent(
    classGroupId,
    lessonId,
    initialClassGroupLessonStudents,
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

  const selectedStudent = classGroupLessonStudent.find(
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
                  givenAnswers={lessonAnswers[question.id]}
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
  req,
}) {
  const {
    fetchLesson,
    fetchClassGroupLessonStudents,
    fetchLessonQuestions,
    fetchLessonAnswers,
  } = fetcher(req.cookies.authorization);

  const [
    initialLesson,
    initialClassGroupLessonStudents,
    initialLessonQuestions,
    initialLessonAnswers,
  ] = await Promise.all([
    fetchLesson(lessonId),
    fetchClassGroupLessonStudents(classGroupId, lessonId),
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
      initialClassGroupLessonStudents,
      initialLessonQuestions,
      initialLessonAnswers,
    },
  };
}

export default StudentAnswers;
