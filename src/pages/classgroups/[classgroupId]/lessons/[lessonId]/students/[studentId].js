import React from 'react';

const StudentAnswers = () => {
  return (
    <div>Hello world</div>
  );
};

export async function getServerSideProps({
  query: { classgroupId, lessonId, studentId },
}) {
  return {
    props: {
      classgroupId,
      lessonId,
      studentId,
    },
  };
}

export default StudentAnswers;
