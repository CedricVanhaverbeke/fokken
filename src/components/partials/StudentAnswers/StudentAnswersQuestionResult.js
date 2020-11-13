import React from 'react';

import StudentAnswersMultipleChoiceResult from './StudentAnswersMultipleChoiceResult';
import StudentAnswersOpenResult from './StudentAnswersOpenResult';

const StudentAnswersQuestionResults = {
  MULTIPLE_CHOICE: StudentAnswersMultipleChoiceResult,
  OPEN: StudentAnswersOpenResult,
};

const StudentAnswersQuestionResult = ({ question, answer }) => {
  const Component = StudentAnswersQuestionResults[question.type];

  return <Component question={question} answer={answer} />;
};

export default StudentAnswersQuestionResult;
