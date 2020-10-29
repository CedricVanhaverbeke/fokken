import React, { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Header, MenuButton } from '@ftrprf/tailwind-components';

import useChangeLanguage from '@/hooks/useChangeLanguage';

import Logo from '../assets/vectors/logo.svg';

import FTRPRFLink from './FTRPRFLink';

import useUser from '../hooks/api/useUser';
import useFormatMessage from '../hooks/useFormatMessage';

const TeacherHeader = () => {
  const t = useFormatMessage();
  const changeLanguage = useChangeLanguage();
  const { user } = useUser();
  const { pathname } = useRouter();

  const userNameOnly = useMemo(() => ({ first_name: user?.firstName }), [user]);

  const languages = useMemo(
    () => [
      { key: 'en', label: t('languages.en') },
      { key: 'nl', label: t('languages.nl') },
    ],
    [t],
  );

  return (
    <Header
      logo={<Logo className="h-full" />}
      languages={languages}
      onLanguageChange={(newLanguage) => {
        changeLanguage(newLanguage);
      }}
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
        <button>{t('header.navigation.pupils')}</button>
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
        <button>{t('header.navigation.hackRoom')}</button>
      </FTRPRFLink>
      <FTRPRFLink to="https://studio.ftrprf.be">
        <button>{t('header.navigation.studio')}</button>
      </FTRPRFLink>
    </Header>
  );
};

export default TeacherHeader;
