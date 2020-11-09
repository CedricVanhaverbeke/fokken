import React, { useMemo } from 'react';

import { SlideViewerTextSlide } from '@ftrprf/slideviewer';
import { Content, PageHeader } from '@ftrprf/tailwind-components';

import fetcher from '@/hooks/api/index';
import useClassGroupLessonStudent from '@/hooks/api/useClassGroupLessonStudent';
import useLesson from '@/hooks/api/useLesson';
import useLessonAnswers from '@/hooks/api/useLessonAnswers';
import useLessonSlides from '@/hooks/api/useLessonSlides';
import useFormatMessage from '@/hooks/useFormatMessage';

import '@ftrprf/slideviewer/styles.css';

import QuestionResult from '@/components/pages/StudentAnswers/QuestionResult';
import PageTitle from '@/components/PageTitle';

const StudentAnswers = ({ classGroupId, lessonId, studentId, viewMode }) => {
  const t = useFormatMessage();

  const { lessonDetails } = useLesson(lessonId);

  const { classGroupLessonStudent } = useClassGroupLessonStudent(
    classGroupId,
    lessonId,
  );

  const { lessonSlides } = useLessonSlides(lessonId, viewMode, true);

  const { lessonAnswers } = useLessonAnswers(classGroupId, lessonId, studentId);

  const questionSlides = useMemo(() => {
    const index = Object.fromEntries(
      lessonAnswers.map((a) => [a.questionId, a]),
    );

    return lessonSlides.map((slide) => ({
      slide,
      answer: index[String(slide.question.id)],
    }));
  }, [lessonSlides, lessonAnswers]);

  const student = classGroupLessonStudent.find(
    (student) => student.id === studentId,
  );

  return (
    <>
      <PageHeader>
        <div className="flex justify-between items-end">
          <PageTitle label={t('student-answers.title.results')}>
            {lessonDetails.title}
          </PageTitle>

          <span>{`${student.firstName} ${student.lastName}`}</span>
        </div>
      </PageHeader>
      {questionSlides.length === 0 && (
        <Content>{t('student-answers.no_questions')}</Content>
      )}
      {questionSlides.length > 0 && (
        <div className="flex flex-col w-full">
          {questionSlides.map(({ slide, answer }, i) => (
            <div
              className="flex w-full justify-center divide-y divide-gray-400 border-gray-300"
              key={slide.question.id}
            >
              <Content>
                <div className="w-full flex flex-col sm:flex-row">
                  <span className="flex-shrink-0 mr-8 uppercase text-xs font-semibold text-gray-600">
                    {t('student-answers.question_label')} {i + 1}
                  </span>
                  <div className="w-full flex flex-col items-center">
                    <div className="max-w-6xl w-full">
                      <div>
                        {slide.question.value ? (
                          <div className="font-semibold">
                            {slide.question.value}
                          </div>
                        ) : (
                          <SlideViewerTextSlide value={slide.content} />
                        )}
                      </div>
                      <div className="mt-4">
                        <QuestionResult
                          question={slide.question}
                          answer={answer}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Content>
            </div>
          ))}
        </div>
      )}
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
