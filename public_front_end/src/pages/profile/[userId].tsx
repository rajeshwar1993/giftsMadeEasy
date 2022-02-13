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
import { NextSeo } from 'next-seo';
import AppConfig from '../../common/appConfig';

const UserProfile = ({
  headerData,
  pageData
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!pageData || !pageData.uid) {
    return <h1>Loading...</h1>;
  }

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

  let pageData;

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

  let headerData: HeaderType = {
    title: `${pageData.name} | ${AppConfig.COMMON.appName}`,
    canonical: '',
    meta: {
      desc: '',
      og: {
        url: '',
        title: '',
        description: '',
        images: []
      }
    }
  };

  return {
    props: { headerData, pageData },
    revalidate: 864000 // revalidate after 10 days
  };
};

export default UserProfile;
