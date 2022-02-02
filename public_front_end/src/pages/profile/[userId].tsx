import type {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage
} from 'next';
import Head from 'next/head';

import { ProfilePage } from '../../pageContainers';
import { HeaderType } from '../../common/types';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { FS_USER_DB } from '../../common/constants';
import { ParsedUrlQuery } from 'querystring';
import { convertUserJsonToObj } from '../../models/User';

const UserProfile = ({
  headerData,
  pageData
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log(pageData);
  if (!pageData || !pageData.uid) {
    return <h1>Loading...</h1>;
  }
  let user = convertUserJsonToObj(pageData, pageData.uid);
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

interface Props {
  headerData: HeaderType;
  pageData: any;
}
interface Params extends ParsedUrlQuery {
  userId: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  // TODO - fetch some user profiles, or none and let it create on the fly

  return {
    paths: [
      {
        params: {
          userId: 'WryJ8RBhpZYlV5UgITKTqe2xpkx2'
        }
      }
    ],
    fallback: true
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params
}) => {
  // must be async
  let { userId } = params!;

  let headerData: any, pageData;

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
