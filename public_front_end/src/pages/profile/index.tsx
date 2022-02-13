import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { ProfilePage } from '../../pageContainers';
import UserType from '../../models/User';
import { RootState } from '../../redux/store';
import { HeaderType } from '../../common/types';
import { NextSeo } from 'next-seo';
import AppConfig from '../../common/appConfig';
import Skeleton from 'react-loading-skeleton';

type Props = {
  // headerData: HeaderType;
  // pageData: User;
};

const MyProfile: NextPage<Props> = ({}) => {
  const router = useRouter();

  const { data: user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    // mode user to profile page if already signed in
    if (!user) {
      // TODO check logic for redirecting
      // router.replace('/auth/signup');
    }
  }, [user]);

  return (
    <div>
      <NextSeo
        title={AppConfig.HOME.headerData.title}
        canonical={''}
        description={AppConfig.HOME.aboutLine}
        openGraph={{
          url: '',
          title: AppConfig.HOME.headerData.title,
          description: AppConfig.HOME.aboutLine,
          images: []
        }}
      />
      {user && <ProfilePage user={user} />}
      {!user && <Skeleton count={5} />}
    </div>
  );
};

export default MyProfile;
