import React from 'react';

import useLesson, { fetchLesson } from '@/hooks/api/useLesson';
import { PageHeader, PageTitle } from '@ftrprf/tailwind-components';

const StudentAnswers = ({
  classGroupId,
  lessonId,
  studentId,
  viewMode,
  initialLesson,
}) => {
  const { lessonDetails } = useLesson(lessonId, initialLesson);

  return (
    <>
      <PageHeader>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <div className="text-lg">Resultaten</div>
            <PageTitle>{lessonDetails.title}</PageTitle>
          </div>
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

  return {
    props: {
      classGroupId,
      lessonId,
      studentId,
      viewMode,
      initialLesson,
    },
  };
}

export default StudentAnswers;
