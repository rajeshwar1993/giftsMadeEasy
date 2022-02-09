import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Footer, NavBar } from '..';
import useWindowSize from '../../hooks/useWindowSize';
import {
  app_toggle_inviteDialogOpen,
  app_toggle_isDesktop,
  app_toggle_isSigupOpen
} from '../../redux/appCommon';
import { RootState, useAppDispatch } from '../../redux/store';
import AuthComponent from '../Reusable/AuthComponent';
import InvitationComponent from '../Reusable/InvitationComponent';
import ToastPopover from '../Reusable/ToastPopup';

import { LayoutConfigType } from './type';

type Props = {
  children: React.ReactChild;
  config: LayoutConfigType;
};

let debounce: any = null;

const Layout: FC<Props> = ({ children, config }) => {
  const size = useWindowSize();
  const dispatch = useAppDispatch();

  const { signUpOpen, inviteDialogOpen } = useSelector(
    (state: RootState) => state.app
  );

  const closeSignup = () => {
    dispatch(app_toggle_isSigupOpen(false));
  };
  const closeDialogOpen = () => {
    dispatch(app_toggle_inviteDialogOpen(false));
  };

  // check window width on change
  useEffect(() => {
    if (debounce) {
      clearTimeout(debounce);
    }
    debounce = setTimeout(() => {
      if (size.width && size?.width >= 1024) {
        dispatch(app_toggle_isDesktop(true));
      } else {
        dispatch(app_toggle_isDesktop(false));
      }
    }, 200);
  }, [size]);

  return (
    <>
      <div className='bg-skin-fill text-skin-primary'>
        <NavBar config={config.navbar} />
        <main className='mx-4 my-4 md:my-8 flex'>
          {/* reserved for side content, maybe ads */}
          <div className='md:w-[2%] lg:w-[4%] xl:w-[7%]' />
          {/* main body area */}
          <div className='md:w-[96%] lg:w-[92%] xl:w-[86%] w-full'>
            {children}
          </div>
          {/* reserved for side content, maybe ads */}
          <div className='md:w-[2%] lg:w-[4%] xl:w-[7%]' />
        </main>
        <Footer config={config.footer} />
      </div>

      <AuthComponent open={!!signUpOpen} closeModal={closeSignup} />
      <InvitationComponent
        open={inviteDialogOpen}
        closeModal={closeDialogOpen}
      />

      <ToastPopover />
    </>
  );
};

export default Layout;
