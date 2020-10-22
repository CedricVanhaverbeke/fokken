import React from 'react';
import { Header, MenuButton } from '@ftrprf/tailwind-components';

import Logo from '../assets/vectors/logo.svg';

import FTRPRFLink from './FTRPRFLink';

const TeacherHeader = () => {
  return (
    <Header
      logo={<Logo className="h-full" />}
      languages={['Nederlands', 'English']}
      onLanguageChange={() => {}}
      profileChildren={() => (
        <div>
          <MenuButton>Profiel</MenuButton>
          <MenuButton>Uitloggen</MenuButton>
        </div>
      )}
    >
      <FTRPRFLink to="/schoolteacherprofile/students" active>
        Leerlingen
      </FTRPRFLink>
      <FTRPRFLink to="/schoolteacherprofile/lessons">Leer</FTRPRFLink>
      <FTRPRFLink to="/schoolteacherprofile/exams">Test</FTRPRFLink>
      <FTRPRFLink to="/schoolteacherprofile/exercises">Codeer</FTRPRFLink>
      <FTRPRFLink to="/schoolteacherprofile/hackroom">Hack Room</FTRPRFLink>
      <FTRPRFLink to="https://studio.ftrprf.be">Studio</FTRPRFLink>
    </Header>
  );
};

export default TeacherHeader;
