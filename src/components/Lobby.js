import React from 'react';

const Lobby = ({ players, ownName, startGame, isHosting }) => {
  return (
    <div className="flex flex-col h-full justify-between text-blue-1000">
      <div>
        <div className="py-4 px-2 border-red-500 border-b">
          Players in lobby
        </div>
        <div className="flex flex-col py-4 px-2">
          <span>{ownName} (you)</span>
          {players.map((player) => (
            <span key={player}>{player}</span>
          ))}
        </div>
      </div>
      {isHosting && (
        <div className="flex items-center justify-center py-4 px-2">
          <button
            className="border-red-500 border-2 rounded-lg  py-2 px-6"
            onClick={startGame}
            disabled={players.length > 1}
          >
            Start
          </button>
        </div>
      )}
    </div>
  );
};

export default Lobby;
