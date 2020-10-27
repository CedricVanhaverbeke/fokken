import React from 'react';
import { Header, MenuButton } from '@ftrprf/tailwind-components';

import Logo from '../assets/vectors/logo.svg';

import FTRPRFLink from './FTRPRFLink';
import useUserDetails from '../hooks/api/useUserDetails';

const redirect = (endpoint) => {
  window.location = `${process.env.NEXT_PUBLIC_EDU_URL}${endpoint}`;
};

const TeacherHeader = ({}) => {
  const { userDetails } = useUserDetails();
  if (userDetails) {
    userDetails.first_name = userDetails.firstName;
  }

  return (
    <Header
      logo={<Logo className="h-full" />}
      languages={[
        { key: 'en', label: 'English' },
        { key: 'nl', label: 'Nederlands' },
      ]}
      onLanguageChange={() => {}}
      profileChildren={() => (
        <div>
          <MenuButton onClick={() => redirect('/schoolteacherprofile/profile')}>
            Profiel
          </MenuButton>
        </div>
      )}
      label="Hello, "
      user={userDetails}
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
