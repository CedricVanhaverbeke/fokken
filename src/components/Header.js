import React, { useMemo } from 'react';
import { useRouter } from 'next/router';

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
  const { pathname } = useRouter();

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
      <FTRPRFLink
        to="/schoolteacherprofile/students"
        active={pathname.startsWith('/classgroups/[classGroupId]/students')}
      >
        <button>Leerlingen</button>
      </FTRPRFLink>
      <FTRPRFLink
        to="/schoolteacherprofile/lessons"
        active={pathname.startsWith('/classgroups/[classGroupId]/lessons')}
      >
        <button>Leer</button>
      </FTRPRFLink>
      <FTRPRFLink
        to="/schoolteacherprofile/exams"
        active={pathname.startsWith('/classgroups/[classGroupId]/exams')}
      >
        <button>Test</button>
      </FTRPRFLink>
      <FTRPRFLink
        to="/schoolteacherprofile/exercises"
        active={pathname.startsWith('/classgroups/[classGroupId]/exercises')}
      >
        <button>Codeer</button>
      </FTRPRFLink>
      <FTRPRFLink
        to="/schoolteacherprofile/hackroom"
        active={pathname.startsWith('/classgroups/[classGroupId]/hackroom')}
      >
        <button>Hack Room</button>
      </FTRPRFLink>
      <FTRPRFLink to="https://studio.ftrprf.be">
        <button>Studio</button>
      </FTRPRFLink>
    </Header>
  );
};

export default TeacherHeader;
