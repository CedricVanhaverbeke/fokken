import React from 'react';

import { MultipleChoiceCard } from '@ftrprf/tailwind-components';

const MultipleChoiceResult = ({ question, answer }) => {
  // TEMP fix: this field will be renamed to questionAnswersMultipleChoice in the future
  const options = question.questionAnswers;

  // TODO: add a message that this answer was not filled in
  if (!answer) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 gap-2 w-full">
      {options.map(({ id: answerId, value, correct, explanation }) => {
        const studentSelectedAnswer = !!answer.answers.find(
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
};

export default MultipleChoiceResult;
