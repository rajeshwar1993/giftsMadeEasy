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
import { FS_USER_DB } from '../../common/constants';
import { ParsedUrlQuery } from 'querystring';
import UserType, { convertUserJsonToObj } from '../../models/User';
import fbAdmin from '../../firebaseServer';

const UserProfile = ({
  headerData,
  pageData
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!pageData || !pageData.uid) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <Head>
        <title>Gifts Made Easy</title>
        <meta name='description' content={'Meta description'} />
        <link rel='icon' href={'/favicon.ico'} />
      </Head>
      {pageData && <ProfilePage user={pageData} />}
    </div>
  );
};

interface Props {
  headerData: HeaderType;
  pageData: UserType;
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

  const db = fbAdmin.firestore();
  const collRef = db.collection(FS_USER_DB);

  const userSnap = await collRef.doc(userId).get();

  if (userSnap.exists) {
    pageData = convertUserJsonToObj(userSnap.data(), userSnap.id);
  }

  if (!pageData) {
    return {
      redirect: {
        destination: '/',
        permanent: false
        // statusCode: 301
      }
    };
  }

  headerData = { title: 'string', metaDesc: 'string' };

  return {
    props: { headerData, pageData },
    revalidate: 864000 // revalidate after 10 days
  };
};

export default UserProfile;
