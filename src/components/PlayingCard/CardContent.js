import React from 'react';

import c from '@/utils/c';

const OneToThreeCard = ({ className, number, Suit }) => (
  <div
    className={c(
      className,
      'h-full w-full flex flex-col items-center',
      number === 1 ? 'justify-center' : 'justify-around',
    )}
  >
    {Array.from(Array(number), () => (
      <Suit />
    ))}
  </div>
);

const FourToSixCard = ({ className, number, Suit }) => (
  <div className={c(className, 'h-full w-full flex flex-col justify-around')}>
    <div className="flex justify-around">
      {Array.from(Array(2), () => (
        <Suit />
      ))}
    </div>
    <div className="flex justify-around">
      {Array.from(Array(number - 4), () => (
        <Suit />
      ))}
    </div>
    <div className="flex justify-around">
      {Array.from(Array(2), () => (
        <Suit />
      ))}
    </div>
  </div>
);

const SevenToTenCard = ({ className, number, Suit }) => (
  <div className={c(className, 'flex justify-around h-full w-full')}>
    <div className="flex flex-col justify-around">
      {Array.from(Array(number < 9 ? 3 : 4), () => (
        <Suit />
      ))}
    </div>
    <div className="flex flex-col py-10 justify-between">
      {Array.from(Array(number < 9 ? number - 6 : number - 8), () => (
        <Suit />
      ))}
    </div>
    <div className="flex flex-col justify-around">
      {Array.from(Array(number < 9 ? 3 : 4), () => (
        <Suit />
      ))}
    </div>
  </div>
);

const cardContents = [
  ...Array(3).fill(OneToThreeCard),
  ...Array(3).fill(FourToSixCard),
  ...Array(4).fill(SevenToTenCard),
];

const CardContent = ({ className, number, Suit }) => {
  const Component = cardContents[number - 1];
  return (
    <Component className={c(className, 'px-4')} number={number} Suit={Suit} />
  );
};

export default CardContent;
