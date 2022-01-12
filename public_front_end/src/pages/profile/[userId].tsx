import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

import { ProfilePage } from '../../pageContainers';
import User from '../../models/User';
import { HeaderType } from '../../common/types';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { FS_USER_DB } from '../../common/constants';
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
