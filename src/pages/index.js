import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import uuid from 'react-uuid';

import Logo from '@/components/Logo';
import Button from '@/components/Button';

import c from '@/utils/c';

const Home = () => {
  const router = useRouter();
  const [isJoinGameClicked, setIsJoinGameClicked] = useState(false);
  const [gameId, setGameId] = useState();

  useEffect(() => {
    function enterPressed(event) {
      if (event.keyCode === 13) {
        router.push(`/game/${gameId}`);
      }
    }

    if (isJoinGameClicked) {
      window.addEventListener('keyup', enterPressed);
    } else {
      window.removeEventListener('keyup', enterPressed);
    }

    return () => window.removeEventListener('keyup', enterPressed);
  }, [isJoinGameClicked]);

  return (
    <div className="flex flex-col flex-grow items-center justify-center text-blue-900  scal">
      <Logo />
      <div className="flex flex-col text-black w-88">
        <div className="flex mt-6 flex-grow">
          <Button
            onClick={() => router.push(`/game/${uuid()}`)}
            className={c(
              'border-l border-t border-b border-black py-4 px-8 flex-grow select-none',
              isJoinGameClicked && 'cursor-not-allowed opacity-50',
            )}
          >
            Host game
          </Button>
          <Button
            className={c(
              'border border-black py-4 px-8 flex-grow select-none',
              isJoinGameClicked && 'bg-blue-200',
            )}
            onClick={() => setIsJoinGameClicked((prev) => !prev)}
          >
            Join game
          </Button>
        </div>
        {isJoinGameClicked && (
          <div className="flex">
            <input
              value={gameId}
              onChange={(e) => setGameId(e.target.value)}
              className="w-full border-l border-b border-r border-black p-1 outline-none"
              placeholder="game id"
            />
            <Button
              onClick={() => router.push(`/game/${gameId}`)}
              className="border-r w-20 border-b border-black text-center select-none"
            >
              Go
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
