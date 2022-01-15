import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import MobileNav from './mobileNav';
import { NavConfig } from './type';
import { ref, onValue, update } from 'firebase/database';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import NavProfileMenu from './navProfileMenu';
import NavNotificationsMenu from './navNotificationsMenu';
import { Button, Icon } from '..';
import { rdb } from '../../firebase';
import { RDB_NOTIFICATIONS_DB } from '../../common/constants';
import Notifications from '../../models/Notifications';
import { NotificationDBKeys } from '../../common/dbKeys';
type Props = {
  config: NavConfig;
};

const NavBar: FC<Props> = ({ config }) => {
  const [menuOpen, toggleMenuOpen] = useState(false);
  const [notificationsOpen, toggleNotificationsOpen] = useState(false);
  const [notifications, updateNotifications] = useState<Array<Notifications>>(
    []
  );
  const user = useSelector((state: RootState) => state.user.data);

  const listenToNotifications = () => {
    const notificationDbRef = ref(rdb, `${RDB_NOTIFICATIONS_DB}/${user?.uid}`);
    onValue(notificationDbRef, snapshot => {
      const data = snapshot.val();
      console.log(data);
      let notis: Array<Notifications> = [];
      for (let key in data) {
        notis.push(new Notifications(data[key], key));
      }
      updateNotifications(notis);
    });
  };

  const markNotification = async (op: 'read' | 'dismiss', notiId: string) => {
    const updates: any = {};
    switch (op) {
      case 'read':
        updates[
          `${RDB_NOTIFICATIONS_DB}/${user?.uid}/${notiId}/${NotificationDBKeys.read}`
        ] = true;
        break;

      case 'dismiss':
        updates[`${RDB_NOTIFICATIONS_DB}/${user?.uid}/${notiId}`] = null;
        break;
    }

    update(ref(rdb), updates);
  };

  useEffect(() => {
    if (user?.uid) listenToNotifications();
  }, [user]);

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
                  topScript={notifications.filter(n => !n.read).length}
                />
                <NavProfileMenu imgSrc={user.imgUrl} name={user.name} />
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
        notifications={notifications}
        markNotification={markNotification}
        closeModal={() => toggleNotificationsOpen(false)}
      />
    </header>
  );
};

export default NavBar;
