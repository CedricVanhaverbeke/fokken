import React from 'react';

import { MultipleChoiceCard } from '@ftrprf/tailwind-components';

import useFormatMessage from '@/hooks/useFormatMessage';

const StudentAnswersMultipleChoiceResult = ({ question, answer }) => {
  const t = useFormatMessage();

  const options =
    question.questionAnswersMultipleChoice || question.questionAnswers;

  if (!answer) {
    return <div>{t('question-result.no-result')}</div>;
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

export default StudentAnswersMultipleChoiceResult;
