import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { ProfilePage } from '../../pageContainers';
import User from '../../models/User';
import { RootState } from '../../redux/store';
import { HeaderType } from '../../common/types';

type Props = {
  headerData: HeaderType;
  pageData: User;
};

const MyProfile: NextPage<Props> = ({ headerData, pageData }) => {
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
      <Head>
        <title>Gifts Made Easy</title>
        <meta name='description' content={'Meta description'} />
        <link rel='icon' href={'/favicon.ico'} />
      </Head>
      {user && <ProfilePage user={user} />}
    </div>
  );
};

export default MyProfile;
