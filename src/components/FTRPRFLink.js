import React from 'react';
import { useRouter } from 'next/router';

const FTRPRFLink = ({ to, children }) => {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.push(`${process.env.NEXT_PUBLIC_EDU_URL}${to}`)}
    >
      {children}
    </button>
  );
};

export default FTRPRFLink;
