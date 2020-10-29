import React from 'react';

import { MultipleChoiceCard } from '@ftrprf/tailwind-components';

const MultipleChoiceResult = ({ possibleAnswers, givenAnswers }) => (
  <div className="grid grid-cols-2 gap-2 w-full">
    {possibleAnswers.map(({ id: answerId, value, correct, explanation }) => {
      const studentSelectedAnswer = !!givenAnswers.find(
        (studentAnswer) => studentAnswer.multipleChoiceAnswerId === answerId,
      );

      return (
        <MultipleChoiceCard
          key={answerId}
          value={value}
          explanation={explanation}
          isClicked={studentSelectedAnswer}
          isCorrect={correct}
          showIsCorrect={true}
          showExplanation={true}
        />
      );
    })}
  </div>
);

export default MultipleChoiceResult;
