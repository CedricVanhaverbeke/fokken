import React from 'react';

import useFormatMessage from '@/hooks/useFormatMessage';

const OpenResult = ({ answer }) => {
  const t = useFormatMessage();

  if (!answer) {
    return <div>{t('question-result.no-result')}</div>;
  }

  return (
    <textarea
      className="w-full shadow-inner border border-gray-300 rounded my-2 px-4 py-2 focus:border"
      value={answer.answers?.[0]?.value}
      disabled
    />
  );
};

export default OpenResult;
