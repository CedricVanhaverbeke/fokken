import React from 'react';
import { Content, PageHeader, PageTitle } from '@ftrprf/tailwind-components';

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
import c from '@/utils/c';

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
          {lessonQuestions.slides.map(
            ({ question, content }, i) =>
              question && (
                <div className="flex gap-x-4 mb-4">
                  <span className="flex-shrink-0">Vraag {i + 1}</span>
                  <div className="flex flex-col flex-grow gap-y-8">
                    <div>{content}</div>
                    <div className="grid grid-cols-2 gap-2 w-full">
                      {question.questionAnswers.map(
                        ({ id: answerId, value, correct }) => {
                          const studentSelectedAnswer = !!lessonAnswers[
                            question.id
                          ].answers.find(
                            (studentAnswer) => studentAnswer.id === answerId,
                          );
                          return (
                            <div
                              key={answerId}
                              className={c(
                                studentSelectedAnswer &&
                                  correct &&
                                  'text-green-500',
                                studentSelectedAnswer &&
                                  !correct &&
                                  'text-red-500',
                                studentSelectedAnswer && 'font-bold',
                              )}
                            >
                              {value}
                            </div>
                          );
                        },
                      )}
                    </div>
                  </div>
                </div>
              ),
          )}
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
