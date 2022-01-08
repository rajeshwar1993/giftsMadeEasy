import type {
  GetStaticProps,
  GetStaticPropsContext,
  GetServerSideProps,
  NextPage,
  PreviewData
} from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { ProfilePage } from '../../pageContainers';
import User from '../../models/User';
import { RootState } from '../../redux/store';
import { HeaderType } from '../../common/types';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { FS_USER_DB } from '../../models/constants';
import { ParsedUrlQuery } from 'querystring';

interface Props {
  headerData: HeaderType;
  pageData: any;
}

const UserProfile: NextPage<Props> = ({ headerData, pageData }) => {
  let user = User.convertJsonToObj(pageData, pageData.uid);
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

interface Params extends ParsedUrlQuery {
  userId: string;
}

export const getServerSideProps: GetServerSideProps<
  Props,
  Params
> = async context => {
  // must be async
  let { userId } = context.params!;
  console.log('USERID: ', userId);

  let headerData, pageData;

  const docRef = doc(db, FS_USER_DB, userId);
  const userSnap = await getDoc(docRef);

  if (userSnap.exists()) {
    pageData = userSnap.data();
    pageData.uid = userSnap.id;
  }

  headerData = { title: 'string', metaDesc: 'string' };

  return {
    props: { headerData, pageData }
  };
};

export default UserProfile;
