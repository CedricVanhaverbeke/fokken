import React, { useMemo } from 'react';

import { Content, PageHeader } from '@ftrprf/tailwind-components';

import fetcher from '@/hooks/api/index';
import useClassGroupLessonStudent from '@/hooks/api/useClassGroupLessonStudent';
import useLesson from '@/hooks/api/useLesson';
import useLessonAnswers from '@/hooks/api/useLessonAnswers';
import useLessonSlides from '@/hooks/api/useLessonSlides';

import QuestionResult from '@/components/pages/StudentAnswers/QuestionResult';
import PageTitle from '@/components/PageTitle';

const StudentAnswers = ({
  classGroupId,
  lessonId,
  studentId,
  viewMode,
  initialLesson,
  initialClassGroupLessonStudents,
  initialLessonSlides,
  initialLessonAnswers,
}) => {
  const { lessonDetails } = useLesson(lessonId, initialLesson);

  const { classGroupLessonStudent } = useClassGroupLessonStudent(
    classGroupId,
    lessonId,
    initialClassGroupLessonStudents,
  );

  const { lessonSlides } = useLessonSlides(
    lessonId,
    viewMode,
    true,
    initialLessonSlides,
  );

  const { lessonAnswers } = useLessonAnswers(
    classGroupId,
    lessonId,
    studentId,
    initialLessonAnswers,
  );

  const questionSlides = useMemo(() => {
    const index = Object.fromEntries(
      lessonAnswers.map((a) => [a.questionId, a]),
    );

    return lessonSlides.map((slide) => ({
      slide,
      answer: index[String(slide.question.id)],
    }));
  }, [lessonSlides, lessonAnswers]);

  const selectedStudent = classGroupLessonStudent.find(
    (student) => student.id === studentId,
  );

  return (
    <>
      <PageHeader>
        <div className="flex justify-between items-end">
          <PageTitle label="Resultaten">{lessonDetails.title}</PageTitle>

          <span>{`${selectedStudent.firstName} ${selectedStudent.lastName}`}</span>
        </div>
      </PageHeader>
      <Content>
        <div className="flex flex-col gap-y-2">
          {questionSlides.map(({ slide, answer }, i) => (
            <div className="flex gap-x-4 mb-4" key={slide.question.id}>
              <span className="flex-shrink-0">Vraag {i + 1}</span>
              <div className="flex flex-col flex-grow gap-y-8">
                <div>{slide.content}</div>
                <QuestionResult question={slide.question} answer={answer} />
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
    fetchLessonSlides,
    fetchLessonAnswers,
  } = fetcher(req.cookies.authorization);

  const [
    initialLesson,
    initialClassGroupLessonStudents,
    initialLessonSlides,
    initialLessonAnswers,
  ] = await Promise.all([
    fetchLesson(lessonId),
    fetchClassGroupLessonStudents(classGroupId, lessonId),
    fetchLessonSlides(lessonId, viewMode, true),
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
      initialLessonSlides,
      initialLessonAnswers,
    },
  };
}

export default StudentAnswers;
