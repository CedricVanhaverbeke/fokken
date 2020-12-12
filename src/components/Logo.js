import React from 'react';
import { FaHandMiddleFinger } from 'react-icons/fa';

const Logo = ({ className, iconClassName, textClassName }) => (
  <div className={className}>
    <div className="flex flex-col items-center justify-center">
      <div className="text-6xl mb-2">
        <FaHandMiddleFinger className={iconClassName} />
      </div>
      <span textClassName={textClassName}>FOKWITHME.COM</span>
    </div>
  </div>
);

export default Logo;
