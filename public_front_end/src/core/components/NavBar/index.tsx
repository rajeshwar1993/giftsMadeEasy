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
    <header className='sticky top-0 bg-skin-fill text-skin-primary z-10 border-b-2 border-opacity-10 border-skin-inverted'>
      <nav aria-label='Top' className='mx-auto p-2 md:px-4 sm:px-6 lg:px-12'>
        <div className='relative flex justify-between items-center lg:text-xl text-md my-2'>
          {/* Left Section */}
          <div className='flex lg:w-1/5 w-3/5 items-center'>
            <div className='lg:block hidden cursor-pointer'>
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
            <div className='mx-2 my-2'>
              <Link href={'/'}>
                <span className='cursor-pointer font-bold md:text-2xl text-lg'>
                  {config.title}
                </span>
              </Link>
            </div>
          </div>

          {/* Mid Section */}
          <div className='w-3/5  justify-center items-center lg:flex hidden '>
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
