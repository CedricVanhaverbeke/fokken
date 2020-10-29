import React, { useMemo } from 'react';

import { Header, MenuButton } from '@ftrprf/tailwind-components';

import Logo from '../assets/vectors/logo.svg';

import FTRPRFLink from './FTRPRFLink';

import useUser from '../hooks/api/useUser';

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
          <FTRPRFLink to="/schoolteacherprofile/profile">
            <MenuButton>Profiel</MenuButton>
          </FTRPRFLink>
        </div>
      )}
      label="Hello, "
      user={userNameOnly}
    >
      <FTRPRFLink to="/schoolteacherprofile/students" active>
        <button>Leerlingen</button>
      </FTRPRFLink>
      <FTRPRFLink to="/schoolteacherprofile/lessons">
        <button>Leer</button>
      </FTRPRFLink>
      <FTRPRFLink to="/schoolteacherprofile/exams">
        <button>Test</button>
      </FTRPRFLink>
      <FTRPRFLink to="/schoolteacherprofile/exercises">
        <button>Codeer</button>
      </FTRPRFLink>
      <FTRPRFLink to="/schoolteacherprofile/hackroom">
        <button>Hack Room</button>
      </FTRPRFLink>
      <FTRPRFLink to="https://studio.ftrprf.be">
        <button>Studio</button>
      </FTRPRFLink>
    </Header>
  );
};

export default TeacherHeader;
