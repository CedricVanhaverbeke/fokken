import React from 'react';

const FTRPRFLink = ({ to, children }) => {
  const child = React.Children.only(children);

  return React.cloneElement(child, {
    onClick: () =>
      window.location.assign(`${process.env.NEXT_PUBLIC_EDU_URL}${to}`),
  });
};

export default FTRPRFLink;
