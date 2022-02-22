import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import MobileNav from './mobileNav';
import { ExpandMenuItem, NavConfig } from './type';
import { ref, onValue, update } from 'firebase/database';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import NavProfileMenu from './navProfileMenu';
import NavNotificationsMenu from './navNotificationsMenu';
import { Button, Icon, ImageComponent, Text } from '..';
import { auth, rdb } from '../../firebase';
import { RDB_NOTIFICATIONS_DB } from '../../common/constants';
import Notifications from '../../models/Notifications';
import { NotificationDBKeys } from '../../common/dbKeys';
import {
  app_sendToast,
  app_toggle_isSigupOpen,
  app_toggle_inviteDialogOpen
} from '../../redux/appCommon';
import { ButtonType } from '../Reusable/Button/type';
import MenuPopover from './menuExpandPopover';
import AppLink from '../Reusable/AppLink';
import { sendEmailVerificationMail } from '../../common/utils';
import { useAuthState } from 'react-firebase-hooks/auth';
import { logSignupOpen } from '../../common/analyticsEvents';
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
  const isDesktop = useSelector((state: RootState) => state.app.isDesktop);
  const [fbUser, loading, error] = useAuthState(auth);
  const dispatch = useAppDispatch();

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
    <header className='sticky bg-skin-fill top-0 z-20 opacity-[0.99]'>
      <nav
        aria-label='Top'
        className='bg-skin-fill text-skin-primary mx-auto p-2 xl:px-8 w-full shadow-sm opacity-[0.99]'
      >
        <div className='relative flex justify-between items-center xl:text-base text-sm text-md'>
          {/* Left Section */}
          <div className='w-3/5 flex items-center'>
            <button
              className='block lg:hidden p-2'
              onClick={() => {
                toggleMenuOpen(true);
              }}
            >
              <Icon iconName='Menu' />
            </button>
            <div
              className='cursor-pointer md:w-[15%] mr-6'
              data-testid='navLogo'
            >
              <span className='sr-only'>{config.title}</span>
              <Link href={'/'}>
                {/* <img
                  className='md:h-12 h-10 w-auto'
                  src={config.logo.img}
                  alt={config.logo.alt}
                /> */}
                <ImageComponent
                  src={config.logo.img}
                  alt={config.logo.alt}
                  height={isDesktop ? 70 : 34}
                  width={isDesktop ? 150 : 100}
                  layout={'fixed'}
                />
              </Link>
            </div>
            <div className='justify-start items-center lg:flex hidden'>
              {config.leftSideNav.map((item, i) => {
                if (item.type === 'link') {
                  let data = item.data as ButtonType;
                  return (
                    <AppLink
                      key={i}
                      text={data.text || ''}
                      link={data.link || '#'}
                      styleClasses='mx-2 px-2 text-lg'
                    />
                  );
                } else {
                  let data = item.data as ExpandMenuItem;
                  return (
                    <MenuPopover
                      key={i}
                      buttonText={data.title}
                      items={data.items}
                      depth={item.depth}
                      headline={item.headline}
                    />
                  );
                }
              })}
            </div>
          </div>

          {/* Right Section */}
          <div className='lg:w-1/5 w-2/5 flex flex-row justify-end items-center'>
            {!user && (
              <>
                <Button
                  text='Signup'
                  defautStyle='cust-btn-link'
                  styleClasses='mx-2 px-2'
                  onClick={() => {
                    logSignupOpen({ source: 'nav_link' });
                    dispatch(app_toggle_isSigupOpen('signup'));
                  }}
                />
                <Button
                  text='Login'
                  defautStyle='cust-btn-link'
                  styleClasses='mx-2 px-2'
                  onClick={() => dispatch(app_toggle_isSigupOpen('login'))}
                />
              </>
            )}
            {user && (
              <>
                <Button
                  icon={{
                    iconName: 'Notifications',
                    size: isDesktop ? '30' : '34'
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

      {!!user && !user.isEmailVerified && (
        <div className='bg-skin-inverted text-skin-inverted text-center flex flex-col py-1'>
          <div>
            <Text
              content={`We have sent a verification mail on ${user?.email}. Please verify and then`}
            />
            <Button
              text='Click Here.'
              defautStyle='cust-btn-link'
              styleClasses='px-2 border-skin-primary'
              wrapperClasses='inline-block'
              onClick={() => {
                window.location.reload();
              }}
            />
          </div>
          <div>
            <Text content={`Didn't get the mail?`} styleClasses='text-xs' />
            <Button
              text='Click Here to Resend.'
              defautStyle='cust-btn-link'
              styleClasses='px-2 border-skin-primary text-xs'
              wrapperClasses='inline-block'
              onClick={() => {
                if (fbUser) {
                  sendEmailVerificationMail(fbUser);
                  dispatch(
                    app_sendToast({
                      type: 'info',
                      message: 'Email Verification sent!'
                    })
                  );
                }
              }}
            />
          </div>
        </div>
      )}

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
