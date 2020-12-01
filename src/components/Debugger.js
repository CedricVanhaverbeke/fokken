import React, { useContext } from 'react';

import { GameContext } from '@/providers/GameProvider';

const includedParams = {
  canPlayFromTable: (data) => JSON.stringify(data),
  canPlayHiddenFromTable: (data) => JSON.stringify(data),
  hand: (data) => JSON.stringify(data),
  table: (data) => JSON.stringify(data),
};

const Debugger = () => {
  const game = useContext(GameContext);

  return process.env.NODE_ENV === 'development' ? (
    <div className=" w-1/4 flex flex-col gap-y-2 absolute top-0 right-0  border border-black bg-gray-500 rounded-l rounded-b z-50">
      <span className="text-left font-bold p-2">Debugger</span>
      <div className="grid grid-cols-2 p-2 pr-4 gap-x-3 text-right">
        {Object.entries(game)
          .filter(([key]) => includedParams[key])
          .map(([key, value]) => (
            <>
              <span>{key}</span>
              <span>{includedParams[key](value)}</span>
            </>
          ))}
      </div>
    </div>
  ) : null;
};

export default Debugger;
