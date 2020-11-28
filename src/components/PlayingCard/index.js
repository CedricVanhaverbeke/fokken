import React from 'react';
import { GiClubs, GiDiamonds, GiHearts, GiSpades } from 'react-icons/gi';

import CardContent from './CardContent';
import CardHeader from './CardHeader';

import c from '@/utils/c';

export const suits = {
  diamonds: [GiDiamonds, 'text-red-500'],
  clubs: [GiClubs, 'text-black'],
  hearts: [GiHearts, 'text-red-500'],
  spades: [GiSpades, 'text-black'],
};

const PlayingCard = ({ className, number, suit, isHidden }) => {
  const [Suit, textColor] = suit;

  if (isHidden) {
    return (
      <div className={c(className, 'border border-black bg-white p-2')}>
        <div
          className="h-full w-full"
          style={{
            textColor: '#1f2953',
            backgroundImage: `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABHNCSVQICAgIfAhkiAAAAEtJREFUGFdjTJn++P+cTFlGBigA8UFMdDG4ApAksiZ0A1BMQjYFXSNYIbpJyFbD5BixKYK5F2YDSA3xCom2GjlYCHoGm2KM4CE2wAG/DGN/8cl1LAAAAABJRU5ErkJggg==)`,
          }}
        />
      </div>
    );
  }

  return (
    <div className={c(className, 'border border-black bg-white', textColor)}>
      <div className="relative h-full w-full">
        <CardHeader
          number={number}
          Suit={Suit}
          className="absolute left-0 top-0 p-1"
        />
        <CardContent
          className={number === 1 ? 'text-4xl' : 'text-sm'}
          number={number}
          Suit={Suit}
        />
        <CardHeader
          number={number}
          Suit={Suit}
          className="absolute right-0 bottom-0 p-1"
          isFacingUp={false}
        />
      </div>
    </div>
  );
};

export default PlayingCard;
