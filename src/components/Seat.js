import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';

import PlayingCard, { suits } from './PlayingCard';
import PlayingStack from './PlayerStack';

import c from '@/utils/c';

const Seat = ({ className, tableIsRight }) => {
  const [isTaken, setIsTaken] = useState(false);

  return (
    <div className="flex flex-grow gap-x-2">
      <button
        onClick={() => setIsTaken((prev) => !prev)}
        className={c(
          'self-center text-xs',
          'bg-white border border-gray-600 rounded-full w-20 h-20 flex items-center justify-center',
          isTaken || 'hover:bg-gray-700 relative',
          tableIsRight || 'transform rotate-180',
        )}
      >
        {isTaken ? (
          <div className="w-full h-full relative">
            <FaUser className="w-full h-full p-6 text-gray-600" />
            <span className="absolute -bottom-1 bg-gray-600 p-1 rounded-md">
              Anouk
            </span>
          </div>
        ) : (
          'Click to sit'
        )}
      </button>
      <div
        style={{ background: '#35654d' }}
        className={c(
          'border-gray-1000 flex items-center justify-center -translate-10',
          tableIsRight ? 'border-l-8' : 'transform rotate-180 border-r-8',
          className,
        )}
      >
        <div
          className={c(
            'transform items-center flex scale-60 gap-x-2',
            tableIsRight
              ? 'rotate-90 -translate-x-16'
              : '-rotate-90 translate-x-16',
          )}
        >
          <PlayingStack>
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

          <PlayingStack>
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
          <PlayingStack>
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
    </div>
  );
};

export default Seat;
