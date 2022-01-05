import React, { FC } from 'react';
import { Footer, NavBar } from '..';

import { LayoutConfigType } from './type';

type Props = {
  children: React.ReactChild;
  config: LayoutConfigType;
};

const Layout: FC<Props> = ({ children, config }) => {
  return (
    <div className='bg-skin-fill text-skin-primary'>
      <NavBar config={config.navbar} />
      <main className='mx-4 my-4 md:my-8 flex'>
        {/* reserved for side content, maybe ads */}
        <div className='xl:w-[12%]' />
        {/* main body area */}
        <div className='xl:w-[86%] w-full'>{children}</div>
        {/* reserved for side content, maybe ads */}
        <div className='xl:w-[12%]' />
      </main>
      <Footer config={config.footer} />
    </div>
  );
};

export default Layout;
