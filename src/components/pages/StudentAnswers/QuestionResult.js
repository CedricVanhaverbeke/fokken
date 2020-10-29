import React from 'react';

import MultipleChoiceResult from './MultipleChoiceResult';
import OpenResult from './OpenResult';

const questionResults = {
  MULTIPLE_CHOICE: MultipleChoiceResult,
  OPEN: OpenResult,
};

const QuestionResult = ({ question, givenAnswers }) => {
  const QuestionResult = questionResults[question.type];

  return (
    <QuestionResult
      possibleAnswers={question.questionAnswers}
      givenAnswers={givenAnswers.answers}
    />
  );
};

export default QuestionResult;
