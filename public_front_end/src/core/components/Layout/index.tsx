import React, { FC } from 'react';
import AllComponents from '../../../core_custom_mixer/components';
import { LayoutConfigType } from './type';

type Props = {
  children: React.ReactChild;
  config: LayoutConfigType;
};

const Layout: FC<Props> = ({ children, config }) => {
  let { Footer, NavBar } = AllComponents;
  return (
    <div className='bg-skin-fill text-skin-primary'>
      <NavBar config={config.navbar} />
      <main className='py-8 md:px-4 sm:px-6 lg:px-12'>{children}</main>
      <Footer config={config.footer} />
    </div>
  );
};

export default Layout;
