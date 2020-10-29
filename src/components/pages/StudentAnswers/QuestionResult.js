import React from 'react';

import MultipleChoiceResult from './MultipleChoiceResult';
import OpenResult from './OpenResult';

const questionResults = {
  MULTIPLE_CHOICE: MultipleChoiceResult,
  OPEN: OpenResult,
};

const QuestionResult = ({ question, answer }) => {
  // TEMP fix: a question does not yet contain a type, so defaulting to multiple choice
  const Component = questionResults.MULTIPLE_CHOICE;

  return <Component question={question} answer={answer} />;
};

export default QuestionResult;
