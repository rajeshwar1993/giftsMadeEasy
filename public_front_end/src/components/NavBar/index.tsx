import React, { FC, useState } from 'react';
import Link from 'next/link';
import MobileNav from './mobileNav';
import { NavConfig } from './type';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import NavProfileMenu from './navProfileMenu';
import NavNotificationsMenu from './navNotificationsMenu';
import { Button, Icon } from '..';
type Props = {
  config: NavConfig;
};

const NavBar: FC<Props> = ({ config }) => {
  const [menuOpen, toggleMenuOpen] = useState(false);
  const [notificationsOpen, toggleNotificationsOpen] = useState(false);

  const { data: user } = useSelector((state: RootState) => state.user);

  return (
    <header className='sticky bg-skin-fill top-0 z-10 xl:flex'>
      {/* <div className='xl:w-[12%]' /> */}
      <nav
        aria-label='Top'
        className='bg-skin-accent bg-opacity-10 mx-auto p-2 xl:px-8 w-full'
      >
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
                  {...btn}
                  defautStyle='cust-btn-link'
                  styleClasses='mx-2 px-2'
                />
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className='lg:w-1/5 w-2/5 flex flex-row justify-end items-center'>
            {!user && (
              <Button
                text='Signin'
                link='/auth/signup'
                defautStyle='cust-btn-link'
                styleClasses='mx-2 px-2'
              />
            )}
            {user && (
              <>
                <Button
                  icon={{
                    iconName: 'Notifications',
                    size: '26'
                  }}
                  onClick={() => toggleNotificationsOpen(true)}
                  defautStyle='cust-btn-link'
                  styleClasses='!border-b-0 mx-2 px-2'
                />
                <NavProfileMenu />
              </>
            )}
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
      {/* Notification Menu */}
      <NavNotificationsMenu
        open={notificationsOpen}
        closeModal={() => toggleNotificationsOpen(false)}
      />
    </header>
  );
};

export default NavBar;
