import React from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../../../firebase';
import { useSelector } from 'react-redux';

import { RootState } from '../../../redux/store';
import { Button } from '../..';

const AuthComponent = () => {
  const { data: userData } = useSelector((state: RootState) => state.user);

  return (
    <div className='flex flex-col'>
      <Button
        text='Sign in with Google'
        styleClasses='text-xl'
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
              const credential = GoogleAuthProvider.credentialFromError(error);
              // ...
            });
        }}
      />
    </div>
  );
};

export default AuthComponent;
