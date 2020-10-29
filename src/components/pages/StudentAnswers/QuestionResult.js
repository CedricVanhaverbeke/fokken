import React from 'react';

import MultipleChoiceResult from './MultipleChoiceResult';
import OpenResult from './OpenResult';

const questionResults = {
  MULTIPLE_CHOICE: MultipleChoiceResult,
  OPEN: OpenResult,
};

const QuestionResult = ({ question, givenAnswer }) => {
  const QuestionResult = questionResults[question.type];
  return (
    <div className="grid grid-cols-2 gap-2 w-full">
      <QuestionResult
        possibleAnswers={question.questionAnswers}
        givenAnswers={givenAnswer.answers}
      />
    </div>
  );
};

export default QuestionResult;
