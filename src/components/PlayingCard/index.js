import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { GiClubs, GiDiamonds, GiHearts, GiSpades } from 'react-icons/gi';
import { GiCardPlay } from 'react-icons/gi';

import CardContent from './CardContent';
import CardHeader from './CardHeader';

import c from '@/utils/c';

export const suits = {
  diamonds: [GiDiamonds, 'text-red-500'],
  clubs: [GiClubs, 'text-black'],
  hearts: [GiHearts, 'text-red-500'],
  spades: [GiSpades, 'text-black'],
};

const PlayingCard = ({
  className,
  number,
  suit,
  isHidden,
  showSuits,
  onSelect,
  onPlayCards,
  isSelected,
  hasExtraOptions,
  hasExtraHoverOptions,
}) => {
  const [Suit, textColor] = suit;
  const [isHovered, setIsHovered] = useState(false);

  if (isHidden) {
    return (
      <div
        className={c(className, 'border border-black p-2 bg-white rounded-lg')}
      >
        <div
          className="h-full w-full border border-gray-1000 rounded-md"
          style={{
            textColor: '#1f2953',
            backgroundImage: `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABHNCSVQICAgIfAhkiAAAAEtJREFUGFdjTJn++P+cTFlGBigA8UFMdDG4ApAksiZ0A1BMQjYFXSNYIbpJyFbD5BixKYK5F2YDSA3xCom2GjlYCHoGm2KM4CE2wAG/DGN/8cl1LAAAAABJRU5ErkJggg==)`,
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={c(
        className,
        'border border-gray-300 rounded-lg bg-white',
        textColor,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full w-full rounded-lg">
        {(hasExtraOptions || (hasExtraHoverOptions && isHovered)) && (
          <div
            className="absolute m-2 bg-white"
            style={{ width: '80%', height: '90%' }}
          >
            <div className="flex flex-col h-full w-full items-center justify-center">
              <button
                className="w-full flex-grow flex items-center justify-center"
                onClick={onPlayCards}
              >
                <GiCardPlay
                  title="play this card directly"
                  className="text-black text-lg"
                />
              </button>

              <button
                className="w-full flex-grow flex items-center justify-center"
                onClick={onSelect}
              >
                <span className="bg-bg p-1 w-6 h-6 text-xs border flex items-center justify-center">
                  {isSelected && (
                    <FaCheck title="select multiple" className="text-white" />
                  )}
                </span>
              </button>
            </div>
          </div>
        )}

        <CardHeader
          number={number}
          Suit={Suit}
          className="absolute left-0 top-0 p-1"
          showSuits={showSuits}
        />
        <CardContent
          className={
            showSuits ? (number === 1 ? 'text-4xl' : 'text-sm') : 'text-sm'
          }
          number={number}
          Suit={Suit}
          showSuits={showSuits}
        />
        <CardHeader
          number={number}
          showSuits={showSuits}
          Suit={Suit}
          className="absolute right-0 bottom-0 p-1"
          isFacingUp={false}
        />
      </div>
    </div>
  );
};

PlayingCard.defaultProps = {
  showSuits: true,
  hasExtraOptions: false,
  hasExtraHoverOptions: false,
  onSelect: () => {},
  onPlayDirectly: () => {},
};

export default PlayingCard;
