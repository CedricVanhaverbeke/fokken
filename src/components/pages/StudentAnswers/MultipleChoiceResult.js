import React from 'react';

import c from '@/utils/c';

const MultipleChoiceResult = ({
  possibleAnswers,
  givenAnswer: givenAnswers,
}) => (
  <div className="grid grid-cols-2 gap-2 w-full">
    {possibleAnswers.map(({ id: answerId, value, correct }) => {
      const studentSelectedAnswer = !!givenAnswers.find(
        (studentAnswer) => studentAnswer.multipleChoiceAnswerId === answerId,
      );

      return (
        <div
          key={answerId}
          className={c(
            studentSelectedAnswer && correct && 'text-green-500',
            studentSelectedAnswer && !correct && 'text-red-500',
            studentSelectedAnswer && 'font-bold',
          )}
        >
          {value}
        </div>
      );
    })}
  </div>
);

export default MultipleChoiceResult;
