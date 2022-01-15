import React from 'react';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../../../firebase';
import { Button } from '../..';

const AuthComponent = () => {
  const onSubmitForm = (e: any) => {
    e.preventDefault();
    // console.log(e.target[0]);
    let email = e.target[0].value;
    let password = e.target[1].value;

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col'>
        <form onSubmit={onSubmitForm}>
          <input type='email' id='email' placeholder='email' />
          <input type='password' id='password' placeholder='password' />
          <button type='submit' id='submit'>
            Submit
          </button>
        </form>
      </div>
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
