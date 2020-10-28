import React from 'react';
import { MenuButton } from '@ftrprf/tailwind-components';
import { useRouter } from 'next/router';

const MenuLink = ({ to, children }) => {
  const router = useRouter();
  return (
    <MenuButton
      onClick={() =>
        window.location.assign(`${process.env.NEXT_PUBLIC_EDU_URL}${to}`)
      }
    >
      {children}
    </MenuButton>
  );
};

export default MenuLink;
