import React, { useMemo } from 'react';
import { useRouter } from 'next/router';

import { SlideViewerTextSlide } from '@ftrprf/slideviewer';
import { Content, PageHeader } from '@ftrprf/tailwind-components';

import useClassGroupLessonStudent from '@/hooks/api/useClassGroupLessonStudent';
import useLesson from '@/hooks/api/useLesson';
import useLessonAnswers from '@/hooks/api/useLessonAnswers';
import useLessonSlides from '@/hooks/api/useLessonSlides';
import useFormatMessage from '@/hooks/useFormatMessage';

import '@ftrprf/slideviewer/styles.css';

import PageTitle from '@/components/PageTitle';
import StudentAnswersQuestionResult from '@/components/partials/StudentAnswers/StudentAnswersQuestionResult';
import {
  ContentSkeleton,
  HeaderSkeleton,
} from '@/components/partials/StudentAnswers/StudentAnswersSkeleton';

const StudentAnswers = () => {
  const t = useFormatMessage();

  const router = useRouter();
  const { classGroupId, lessonId, studentId, viewMode } = router.query;

  const { lessonDetails, isLoading: lessonLoading } = useLesson(lessonId);

  const {
    classGroupLessonStudent,
    isLoading: classGroupLessonStudentLoading,
  } = useClassGroupLessonStudent(classGroupId, lessonId);

  const { lessonSlides } = useLessonSlides(lessonId, viewMode, true);
  const { lessonAnswers } = useLessonAnswers(classGroupId, lessonId, studentId);

  const questionSlides = useMemo(() => {
    if (lessonAnswers && lessonSlides) {
      const index = Object.fromEntries(
        lessonAnswers.map((a) => [a.questionId, a]),
      );

      return lessonSlides.map((slide) => ({
        slide,
        answer: index[String(slide.question.id)],
      }));
    }

    return [];
  }, [lessonSlides, lessonAnswers]);

  const student = classGroupLessonStudent?.find(
    (student) => student.id === studentId,
  );

  return (
    <>
      <HeaderSkeleton
        lessonLoading={lessonLoading}
        classGroupLessonStudentLoading={classGroupLessonStudentLoading}
      >
        <PageHeader>
          <div className="flex justify-between items-end">
            <PageTitle label={t('student-answers.title.results')}>
              {lessonDetails?.title}
            </PageTitle>
            <span>{`${student?.firstName} ${student?.lastName}`}</span>
          </div>
        </PageHeader>
      </HeaderSkeleton>

      <ContentSkeleton questionSlides={!!questionSlides}>
        <Content>
          {questionSlides.length === 0 ? (
            t('student-answers.no_questions')
          ) : (
            <div className="flex flex-col w-full gap-4">
              {questionSlides.map(({ slide, answer }, i) => (
                <div
                  className="flex w-full justify-center divide-y divide-gray-400 border-gray-300"
                  key={slide.question.id}
                >
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
                          <StudentAnswersQuestionResult
                            question={slide.question}
                            answer={answer}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Content>
      </ContentSkeleton>
    </>
  );
};

export default StudentAnswers;
