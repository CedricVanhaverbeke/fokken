import React from 'react';

import c from '@/utils/c';

/*
 1-3 : flex-col met justify between
 4-6 : buitenste 4 blijven, enkel binnenste jusitfy between doen
 7-8 : buitenste 6 blijven, middelste 2 veranderen
 9-10: buitenste 8 blijven, middelste 2 veranderen
 J-Q-K: Speciallekes
*/

/*
 <PlayingCard number={2} symbol={}>
*/

const OneToThreeCard = ({ number, symbol }) => (
  <div
    className={c(
      'h-full w-full flex flex-col items-center',
      number === 1 ? 'justify-center' : 'justify-around',
    )}
  >
    {Array.from(Array(number), () => (
      <span>X</span>
    ))}
  </div>
);

const FourToSixCard = ({ number, symbol }) => (
  <div className="h-full w-full flex flex-col justify-around">
    <div className="flex justify-around">
      {Array.from(Array(2), () => (
        <span>X</span>
      ))}
    </div>
    <div className="flex justify-around">
      {Array.from(Array(number - 4), () => (
        <span>X</span>
      ))}
    </div>
    <div className="flex justify-around">
      {Array.from(Array(2), () => (
        <span>X</span>
      ))}
    </div>
  </div>
);

const cardContents = [
  ...Array(3).fill(OneToThreeCard),
  ...Array(3).fill(FourToSixCard),
];

const PlayingCard = ({ number, symbol }) => {
  const CardContent = cardContents[number - 1];

  return (
    <div className="w-24 h-48 border border-black">
      <CardContent number={number} symbol={symbol} />
    </div>
  );
};

export default PlayingCard;
