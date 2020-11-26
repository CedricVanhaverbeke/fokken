import React from 'react';
import { FaHandMiddleFinger } from 'react-icons/fa';

import c from '@/utils/c';

const Table = ({ children, className }) => (
  <div
    style={{ background: '#35654d' }}
    className={c(className, 'lg:rounded-full lg:border-8 border-gray-1000')}
  >
    {children}
    <div className="absolute ml-auto mr-auto">
      <div className="flex flex-col items-center justify-center opacity-50">
        <div className="text-6xl mb-2">
          <FaHandMiddleFinger />
        </div>
        <span>NIEFOKKENMEMIJ.BE</span>
      </div>
    </div>
  </div>
);

export default Table;
