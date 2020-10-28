import React, { useMemo } from 'react';
import { Header } from '@ftrprf/tailwind-components';

import Logo from '../assets/vectors/logo.svg';

import FTRPRFLink from './FTRPRFLink';
import useUser from '../hooks/api/useUser';
import MenuLink from './MenuLink';

const languages = [
  { key: 'en', label: 'English' },
  { key: 'nl', label: 'Nederlands' },
];

const TeacherHeader = () => {
  const { user } = useUser();
  const userNameOnly = useMemo(() => ({ first_name: user?.firstName }), [user]);

  return (
    <Header
      logo={<Logo className="h-full" />}
      languages={languages}
      onLanguageChange={() => {}}
      profileChildren={() => (
        <div>
          <MenuLink to={'/schoolteacherprofile/profile'}>Profiel</MenuLink>
        </div>
      )}
      label="Hello, "
      user={userNameOnly}
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
