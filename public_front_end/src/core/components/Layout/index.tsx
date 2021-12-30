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
      <main className='mx-2 my-4 md:my-8 flex'>
        {/* reserved for side content, maybe ads */}
        <div className='xl:w-[12%]' />
        {/* main body area */}
        <div className='xl:w-[86%]'>{children}</div>
        {/* reserved for side content, maybe ads */}
        <div className='xl:w-[12%]' />
      </main>
      <Footer config={config.footer} />
    </div>
  );
};

export default Layout;
