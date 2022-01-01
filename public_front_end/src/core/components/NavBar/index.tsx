import React, { FC, useState } from 'react';
import Link from 'next/link';
import MobileNav from './mobileNav';
import { NavConfig } from './type';
import AllComponents from '../../../core_custom_mixer/components';
type Props = {
  config: NavConfig;
};

const NavBar: FC<Props> = ({ config }) => {
  const [menuOpen, toggleMenuOpen] = useState(false);

  let { Icon, Button } = AllComponents;

  return (
    <header className='sticky bg-skin-fill top-0 z-10 xl:flex'>
      {/* <div className='xl:w-[12%]' /> */}
      <nav aria-label='Top' className='mx-auto p-2 xl:px-8 w-full'>
        <div className='relative flex justify-between items-center xl:text-base text-sm text-md'>
          {/* Left Section */}
          <div className='w-3/5 flex items-center'>
            <div className='lg:block hidden cursor-pointer w-[15%]'>
              <span className='sr-only'>{config.title}</span>
              <Link href={'/'}>
                <img
                  className='md:h-8 h-6 w-auto'
                  src={config.logo.img}
                  alt={config.logo.alt}
                />
              </Link>
            </div>
            <button
              className='block lg:hidden p-2'
              onClick={() => {
                toggleMenuOpen(true);
              }}
            >
              <Icon iconName='Menu' />
            </button>
            <div className='justify-start items-center lg:flex hidden '>
              {config.leftSideNav.map((btn, i) => (
                <Button
                  key={i}
                  link={btn.link}
                  onClick={btn.onClick}
                  text={btn.text}
                  icon={btn.icon}
                  showOnlyIcon={btn.showOnlyIcon}
                  wrapperClasses={`border-0  mx-2 ${btn.wrapperClasses}`}
                  styleClasses={`hover:text-skin-accent ${btn.styleClasses}`}
                />
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className='lg:w-1/5 w-2/5 flex justify-end items-center'>
            {config.rightSideNav.map((btn, i) => (
              <Button
                key={i}
                link={btn.link}
                onClick={btn.onClick}
                text={btn.text}
                icon={btn.icon}
                showOnlyIcon={btn.showOnlyIcon}
                wrapperClasses={`border-0  mx-2 ${btn.wrapperClasses}`}
                styleClasses={`hover:text-skin-accent ${btn.styleClasses}`}
              />
            ))}
          </div>
        </div>
      </nav>
      {/* <div className='xl:w-[12%]' /> */}
      {/* Mobile Menu */}
      <MobileNav
        config={config}
        menuOpen={menuOpen}
        toggleMenuOpen={toggleMenuOpen}
      />
    </header>
  );
};

export default NavBar;
