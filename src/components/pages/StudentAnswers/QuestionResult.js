import React from 'react';

import MultipleChoiceResult from './MultipleChoiceResult';
import OpenResult from './OpenResult';

const questionResults = {
  MULTIPLE_CHOICE: MultipleChoiceResult,
  OPEN: OpenResult,
};

const QuestionResult = ({ question, answer }) => {
  const Component = questionResults[question.type];

  return <Component question={question} answer={answer} />;
};

export default QuestionResult;
