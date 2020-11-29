import React, { useContext } from 'react';
import { FaHandMiddleFinger } from 'react-icons/fa';

import PlayingCard, { suits } from './PlayingCard';
import PlayingStack from './PlayerStack';
import Seat from './Seat';

import { GameContext } from '@/providers/GameProvider';

import c from '@/utils/c';

const Table = ({ children, className }) => {
  const game = useContext(GameContext);

  console.log(game);

  return (
    <div className={className}>
      <div className="flex flex-col h-full justify-around">
        <Seat className="border-t-8" tableIsRight={true} />
        <Seat tableIsRight={true} />
        <Seat className="border-b-8" tableIsRight={true} />
      </div>
      <div
        style={{ background: '#35654d' }}
        className={c(
          'flex flex-col flex-grow items-center justify-center border-b-8 border-t-8 border-gray-1000',
        )}
      >
        {children}
        <div className="absolute ml-auto mr-auto">
          <div className="flex flex-col items-center justify-center opacity-50">
            <div className="text-6xl mb-2">
              <FaHandMiddleFinger />
            </div>
            <span>FOKWITHME.COM</span>
          </div>
        </div>
        <div className={c('transform items-center flex scale-60 gap-x-2')}>
          <PlayingStack canPlay={game.canPlayFromTable} ownStack={true}>
            <PlayingCard
              className="w-24 h-40 transform"
              number={1}
              suit={suits.clubs}
              isHidden={false}
            />
            <PlayingCard
              className="w-24 h-40 transform"
              number={1}
              suit={suits.clubs}
              isHidden={false}
            />
          </PlayingStack>

          <PlayingStack canPlay={game.canPlayFromTable} ownStack={true}>
            <PlayingCard
              className="w-24 h-40 transform"
              number={1}
              suit={suits.clubs}
              isHidden={true}
            />
            <PlayingCard
              className="w-24 h-40 transform"
              number={1}
              suit={suits.clubs}
              isHidden={false}
            />
          </PlayingStack>
          <PlayingStack canPlay={game.canPlayFromTable} ownStack={true}>
            <PlayingCard
              className="w-24 h-40 transform"
              number={1}
              suit={suits.clubs}
              isHidden={true}
            />
            <PlayingCard
              className="w-24 h-40 transform"
              number={1}
              suit={suits.clubs}
              isHidden={false}
            />
          </PlayingStack>
        </div>
      </div>
      <div className="flex flex-col h-full justify-around transform rotate-180">
        <Seat className="border-b-8" tableIsRight={false} />
        <Seat tableIsRight={false} />
        <Seat className="border-t-8" tableIsRight={false} />
      </div>
    </div>
  );
};

export default Table;
