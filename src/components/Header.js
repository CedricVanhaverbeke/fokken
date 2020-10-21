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
      <Header.Item>
        <FTRPRFLink to="/schoolteacherprofile/students">Leerlingen</FTRPRFLink>
      </Header.Item>
      <Header.Item>
        <FTRPRFLink to="/schoolteacherprofile/lessons">Leer</FTRPRFLink>
      </Header.Item>
      <Header.Item>
        <FTRPRFLink to="/schoolteacherprofile/exams">Test</FTRPRFLink>
      </Header.Item>
      <Header.Item>
        <FTRPRFLink to="/schoolteacherprofile/exercises">Codeer</FTRPRFLink>
      </Header.Item>
      <Header.Item>
        <FTRPRFLink to="/schoolteacherprofile/hackroom">Hack Room</FTRPRFLink>
      </Header.Item>
      <Header.Item>
        <FTRPRFLink to="https://studio.ftrprf.be">Studio</FTRPRFLink>
      </Header.Item>
    </Header>
  );
};

export default TeacherHeader;
