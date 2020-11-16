import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Switcher = ({ onNext, onPrevious, currentIndex, itemsSize }) => {
  return (
    <div className="flex">
      <button
        role="previousButton"
        onClick={onPrevious}
        disabled={currentIndex === 0}
      >
        <FaAngleLeft
          className={currentIndex === 0 && 'text-gray-500 cursor-not-allowed'}
        />
      </button>

      <button
        role="nextButton"
        onClick={onNext}
        disabled={currentIndex === itemsSize - 1}
      >
        <FaAngleRight
          className={
            currentIndex === itemsSize - 1 && 'text-gray-500 cursor-not-allowed'
          }
        />
      </button>
    </div>
  );
};

export default Switcher;
