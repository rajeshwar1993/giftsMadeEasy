import type { NextPage } from 'next';
import Head from 'next/head';

import { PageProps as Props } from '../../core/pageFormats/types';
import { ProfilePage } from '../../custom_client_code/customPageDesigns';

const Profile: NextPage<Props> = () => {
  return (
    <div>
      <Head>
        <title>Gifts Made Easy</title>
        <meta name='description' content={'Meta description'} />
        <link rel='icon' href={'/favicon.ico'} />
      </Head>
      <ProfilePage />
    </div>
  );
};

export default Profile;
