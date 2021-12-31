import type { GetStaticProps, NextPage } from 'next';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import Head from 'next/head';

import { PageProps as Props } from '../core/pageFormats/types';
import { HomePage } from '../custom_client_code/customPageDesigns';
import { RootState, useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';
import { decrement, increment } from '../redux/counter';

const Home: NextPage<Props> = () => {
  const { data: userData } = useSelector((state: RootState) => state.user);

  return (
    <div>
      <Head>
        <title>Gifts Made Easy</title>
        <meta name='description' content={'Meta description'} />
        <link rel='icon' href={'/favicon.ico'} />
      </Head>
      {userData && <h1>{userData.name}</h1>}

      <HomePage />
    </div>
  );
};

// export const getStaticProps: GetStaticProps<Props> = async context => {
//   // must be async
//   console.log(context);

//   let headerData, sections;

//   let fetchedData = await fetch(
//     `http://localhost:3000/api/${DATA_SOURCE.toString()}/data/homePage`
//   );
//   fetchedData = await fetchedData.json();
//   let parsedData = getDataParser(DATA_SOURCE, fetchedData);
//   headerData = parsedData.headerData;
//   sections = parsedData.sections;

//   return {
//     props: { headerData, sections }
//   };
// };

export default Home;
