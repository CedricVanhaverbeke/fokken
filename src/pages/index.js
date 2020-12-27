import React, { useContext, useEffect, useState } from 'react';
import uuid from 'react-uuid';
import { useRouter } from 'next/router';

import useTitle from '@/hooks/useTitle';

import c from '@/utils/c';

import Button from '@/components/Button';
import Loader from '@/components/Loader';
import Logo from '@/components/Logo';
import { GameContext } from '@/providers/GameProvider';

const Home = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isJoinGameClicked, setIsJoinGameClicked] = useState(false);
  const [gameId, setGameId] = useState();
  useTitle();

  const { setIsHosting } = useContext(GameContext);

  useEffect(() => {
    function enterPressed(event) {
      if (event.keyCode === 13) {
        setIsLoading(true);
        router.push(`/game/${gameId}`);
      }
    }

    if (isJoinGameClicked) {
      window.addEventListener('keyup', enterPressed);
    } else {
      window.removeEventListener('keyup', enterPressed);
    }

    return () => window.removeEventListener('keyup', enterPressed);
  }, [gameId, isJoinGameClicked, router]);

  return (
    <div className="flex flex-col flex-grow items-center justify-center text-blue-900  scal">
      <Logo />
      <div className="flex flex-col text-black w-88">
        <div
          className={c(
            isLoading && 'opacity-50 cursor-not-allowed',
            'flex mt-6 flex-grow',
          )}
        >
          <Button
            onClick={() => {
              setIsHosting(true);
              setIsLoading(true);
              router.push(`/game/${uuid()}`);
            }}
            className={c(
              'border-l border-t border-b border-black py-4 px-8 flex-grow select-none',
              isJoinGameClicked && 'cursor-not-allowed opacity-50',
              isLoading && 'cursor-not-allowed',
            )}
          >
            Host game
          </Button>
          <Button
            className={c(
              'border border-black py-4 px-8 flex-grow select-none',
              isJoinGameClicked && 'bg-blue-200',
              isLoading && 'cursor-not-allowed',
            )}
            onClick={() => setIsJoinGameClicked((prev) => !prev)}
          >
            Join game
          </Button>
        </div>
        {isJoinGameClicked && (
          <div
            className={c(isLoading && 'opacity-50 cursor-not-allowed', 'flex')}
          >
            <input
              value={gameId}
              onChange={(e) => setGameId(e.target.value)}
              className="w-full border-l border-b border-r border-black p-1 outline-none"
              placeholder="game id"
            />
            <Button
              onClick={() => {
                setIsLoading(true);
                router.push(`/game/${gameId}`);
              }}
              className={c(
                isLoading && 'cursor-not-allowed',
                'border-r w-20 border-b border-black text-center select-none',
              )}
            >
              Go
            </Button>
          </div>
        )}
        {isLoading && (
          <Loader
            className="mt-2"
            text={isJoinGameClicked ? 'Joining game' : 'Creating game'}
          />
        )}
        <span className="text-xs text-center">version 0.0.69-alpha</span>
      </div>
    </div>
  );
};

export default Home;
