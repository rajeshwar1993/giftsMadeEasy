import type { GetStaticProps, NextPage } from 'next';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import Head from 'next/head';

import { PageProps as Props } from '../core/pageFormats/types';
import { HomePage } from '../custom_client_code/customPageDesigns';

const Home: NextPage<Props> = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <div>
      <Head>
        <title>Gifts Made Easy</title>
        <meta name='description' content={'Meta description'} />
        <link rel='icon' href={'/favicon.ico'} />
      </Head>
      {user && (
        <>
          Signed in as {user.email} <br />
          <button onClick={() => signOut(auth)}>Sign out</button>
        </>
      )}
      {!user && (
        <>
          Not signed in <br />
          <button
            onClick={() => {
              const provider = new GoogleAuthProvider();
              signInWithPopup(auth, provider)
                .then(result => {
                  // This gives you a Google Access Token. You can use it to access the Google API.
                  const credential =
                    GoogleAuthProvider.credentialFromResult(result);
                  const token = credential!.accessToken;
                  // The signed-in user info.
                  const user = result.user;
                  // ...
                  console.log(user);
                })
                .catch(error => {
                  // Handle Errors here.
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  // The email of the user's account used.
                  const email = error.email;
                  // The AuthCredential type that was used.
                  const credential =
                    GoogleAuthProvider.credentialFromError(error);
                  // ...
                });
            }}
          >
            Sign in
          </button>
        </>
      )}
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
