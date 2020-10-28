import React from 'react';
import { MenuButton } from '@ftrprf/tailwind-components';

const redirect = (endpoint) => {
  window.location = `${process.env.NEXT_PUBLIC_EDU_URL}${endpoint}`;
};

const MenuLink = ({ to, children }) => {
  return <MenuButton onClick={() => redirect(to)}>{children}</MenuButton>;
};

export default MenuLink;
