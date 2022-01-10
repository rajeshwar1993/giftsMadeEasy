import { useEffect } from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { layoutConfig } from '../common/layoutConfig';
import { auth, db } from '../firebase';
import store, { useAppDispatch } from '../redux/store';
import { Provider } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ur_init, ur_setLoading, ur_setError, ur_logout } from '../redux/user';
import { User as FirebaseUser } from 'firebase/auth';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import User from '../models/User';
import { FS_USER_DB } from '../common/constants';
import { Layout } from '../components';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='text-skin-primary bg-skin-fill'>
      <Provider store={store}>
        <WrapperComp>
          <Layout config={layoutConfig}>
            <Component {...pageProps} />
          </Layout>
        </WrapperComp>
      </Provider>
    </div>
  );
}

function WrapperComp(props: any) {
  const [user, loading, error] = useAuthState(auth);
  const dispatch = useAppDispatch();

  const getUserDataFromFirestore = async (fbUser: FirebaseUser) => {
    try {
      // check if user is valid
      if (!fbUser) return;

      let userData: User;

      // check firebase db for entry and get data
      const userID = fbUser.uid;
      const docRef = doc(db, FS_USER_DB, userID);
      const userSnap = await getDoc(docRef);

      if (userSnap.exists()) {
        userData = User.convertJsonToObj(userSnap.data(), userSnap.id);
      }
      // if entry not found then create entry
      // TODO also run all first time functions -> welcome email, strong into algolia etc
      else {
        userData = new User();
        userData.uid = fbUser.uid;
        userData.email = fbUser.email || '';
        userData.isEmailVerified = fbUser.emailVerified;
        userData.isAnonymous = fbUser.isAnonymous;
        userData.name = fbUser.displayName || 'Your Name';

        // creating entry in firestore

        const userRef = collection(db, FS_USER_DB);
        const dbData = {
          ...userData.convertToJson()
        };
        await setDoc(doc(userRef, userID), dbData);
      }

      // then update redux with new or existing data
      dispatch(ur_init(userData));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // TODO if error -> then setError state, ask user to refresh
    if (error) {
      dispatch(ur_setError(error.message));
    }

    // TODO if user is null (not signed in) make him signin with anonymous login
    else if (!user) {
      // TODO anonymous login ?

      // dispatching logout
      dispatch(ur_logout());
    } else {
      getUserDataFromFirestore(user);
    }
  }, [user, loading, error]);

  return <>{props.children}</>;
}

export default MyApp;
