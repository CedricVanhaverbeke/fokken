import React, { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Header, MenuButton } from '@ftrprf/tailwind-components';

import Logo from '../assets/vectors/logo.svg';

import FTRPRFLink from './FTRPRFLink';

import useUser from '../hooks/api/useUser';
import useFormatMessage from '../hooks/useFormatMessage';
import useChangeLanguage from '@/hooks/useChangeLanguage';

const languages = [
  { key: 'en', label: 'English' },
  { key: 'nl', label: 'Nederlands' },
];

const TeacherHeader = () => {
  const t = useFormatMessage();
  const changeLanguage = useChangeLanguage();
  const { user } = useUser();
  const { pathname } = useRouter();

  const userNameOnly = useMemo(() => ({ first_name: user?.firstName }), [user]);

  return (
    <Header
      logo={
        <FTRPRFLink
          to="/schoolteacherprofile/students"
          active={pathname.startsWith('/classgroups/[classGroupId]/students')}
        >
          <Logo className="h-full cursor-pointer" />
        </FTRPRFLink>
      }
      languages={languages}
      onLanguageChange={changeLanguage}
      profileChildren={() => (
        <div>
          <FTRPRFLink to="/schoolteacherprofile/profile">
            <MenuButton>{t('header.profile')}</MenuButton>
          </FTRPRFLink>
        </div>
      )}
      label={t('header.hello')}
      user={userNameOnly}
    >
      <FTRPRFLink
        to="/schoolteacherprofile/students"
        active={pathname.startsWith('/classgroups/[classGroupId]/students')}
      >
        <button>{t('header.navigation.students')}</button>
      </FTRPRFLink>
      <FTRPRFLink
        to="/schoolteacherprofile/lessons"
        active={pathname.startsWith('/classgroups/[classGroupId]/lessons')}
      >
        <button>{t('header.navigation.lessons')}</button>
      </FTRPRFLink>
      <FTRPRFLink
        to="/schoolteacherprofile/exams"
        active={pathname.startsWith('/classgroups/[classGroupId]/exams')}
      >
        <button>{t('header.navigation.exams')}</button>
      </FTRPRFLink>
      <FTRPRFLink
        to="/schoolteacherprofile/exercises"
        active={pathname.startsWith('/classgroups/[classGroupId]/exercises')}
      >
        <button>{t('header.navigation.exercises')}</button>
      </FTRPRFLink>
      <FTRPRFLink
        to="/schoolteacherprofile/hackroom"
        active={pathname.startsWith('/classgroups/[classGroupId]/hackroom')}
      >
        <button>{t('header.navigation.hack_room')}</button>
      </FTRPRFLink>
      <FTRPRFLink to="https://studio.ftrprf.be">
        <button>{t('header.navigation.studio')}</button>
      </FTRPRFLink>
    </Header>
  );
};

export default TeacherHeader;
