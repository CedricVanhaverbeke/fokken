import React from 'react';

const StudentAnswers = () => {
  return <div>Hello world</div>;
};

export function getServerSideProps({
  params: { classGroupId, lessonId, studentId },
  query: { viewMode },
}) {
  return {
    props: {
      classGroupId,
      lessonId,
      studentId,
      viewMode,
    },
  };
}

export default StudentAnswers;
