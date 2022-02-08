import { useEffect } from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { layoutConfig } from '../common/layoutConfig';
import { auth, db } from '../firebase';
import store, { useAppDispatch } from '../redux/store';
import { Provider } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ur_init, ur_setError, ur_logout } from '../redux/user';
import { User as FirebaseUser } from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore';
import UserType, {
  convertUserJsonToObj,
  convertUserToJson
} from '../models/User';
import { FS_USER_DB } from '../common/constants';
import { Layout } from '../components';
import { UserDBKeys } from '../common/dbKeys';
import { sendEmailVerificationMail } from '../common/utils';
import { app_toggle_isSigupOpen } from '../redux/appCommon';
import { cu_init } from '../redux/myCircleList';
import { useRouter } from 'next/router';

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
  const router = useRouter();

  const getUserDataFromFirestore = async (fbUser: FirebaseUser) => {
    try {
      // check if user is valid
      if (!fbUser) return;

      let userData: UserType;

      // check firebase db for entry and get data
      const userID = fbUser.uid;
      const docRef = doc(db, FS_USER_DB, userID);
      const userSnap = await getDoc(docRef);

      if (userSnap.exists()) {
        userData = convertUserJsonToObj(userSnap.data(), userSnap.id);

        // check for update in email verification
        // check if fbuser is true now and db has false value
        if (fbUser.emailVerified && !userData.isEmailVerified) {
          // we need to update the firestore
          updateDoc(docRef, {
            [UserDBKeys.isEmailVerified]: true
          });
          userData.isEmailVerified = true;
        }
      }
      // if entry not found then create entry
      // TODO also run all first time functions -> welcome email, strong into algolia etc
      else {
        userData = convertUserJsonToObj(
          {
            [UserDBKeys.email]: fbUser.email || '',
            [UserDBKeys.isEmailVerified]: fbUser.emailVerified,
            [UserDBKeys.isAnonymous]: fbUser.isAnonymous,
            [UserDBKeys.name]: fbUser.displayName || ''
          },
          fbUser.uid
        );
        // creating entry in firestore

        const userRef = collection(db, FS_USER_DB);

        await setDoc(doc(userRef, userID), {
          ...convertUserToJson(userData),
          [UserDBKeys.createdTS]: serverTimestamp()
        });
      }

      // send verification mail if email is not verified
      if (!fbUser.emailVerified) sendEmailVerificationMail(fbUser);

      // open basic details or phone if not filled
      let GMEVerPopCount = sessionStorage.getItem('GMEVerPopCount') || '3';

      if (
        sessionStorage.getItem('GMEVerPopCount') === '3' &&
        (!userData.name || !userData.phoneNumber || !userData.dob)
      ) {
        sessionStorage.setItem('GMEVerPopCount', '0');
        dispatch(app_toggle_isSigupOpen('login'));
      } else {
        sessionStorage.setItem(
          'GMEVerPopCount',
          (parseInt(GMEVerPopCount) + 1).toString()
        );
      }

      // then update redux with new or existing data
      dispatch(ur_init(userData));
    } catch (e) {
      console.log(e);
    }
  };

  const signoutOps = () => {
    // dispatching logout
    dispatch(ur_logout());
    // init circle user with empty array
    dispatch(cu_init([]));

    router.push('/');
  };

  useEffect(() => {
    // TODO if error -> then setError state, ask user to refresh
    if (error) {
      dispatch(ur_setError(error.message));
    }

    // TODO if user is null (not signed in) make him signin with anonymous login
    else if (!user) {
      // TODO anonymous login ?

      signoutOps();
    } else {
      getUserDataFromFirestore(user);
    }
  }, [user, loading, error]);

  return <>{props.children}</>;
}

export default MyApp;
