import React from 'react';

const StudentAnswers = () => {
  return <div>Hello world</div>;
};

export function getServerSideProps({
  query: { classGroupId, lessonId, studentId, viewMode },
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
