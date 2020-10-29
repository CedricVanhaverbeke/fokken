import React from 'react';
import Head from 'next/head';

import isFunction from '@/utils/isFunction';

const join = (...parts) => {
  return parts.join(' · ');
};

const Title = ({ title }) => {
  const result = isFunction(title) ? title(join) : title;
  const enhancedTitle = result ? join(result, 'FTRPRF') : 'FTRPRF';

  return (
    <Head>
      <title>{enhancedTitle}</title>
    </Head>
  );
};

export default Title;
