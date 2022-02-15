import React, { FC, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  FacebookAuthProvider
} from 'firebase/auth';
import { auth } from '../../../firebase';
import { Button } from '../..';
import Text from '../Text';
import { Tab } from '@headlessui/react';
import { classNames, logError } from '../../../common/utils';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { ERROR_MESSAGE_MAPPING } from '../../../common/constants';

type Props = {
  setStep: Function;
};

const SignupLoginFlow: FC<Props> = ({ setStep }) => {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const { isDesktop, signUpOpen } = useSelector(
    (state: RootState) => state.app
  );

  const onSubmitSignupForm = (e: any) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    // console.log(e.target[0]);
    let email = e.target[0].value;
    let password = e.target[1].value;
    let confirm = e.target[2].value;

    if (password !== confirm) {
      setError(ERROR_MESSAGE_MAPPING('PASSWORD_MISMATCH'));
      setLoading(false);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        // ...
        setLoading(false);
      })
      .catch(error => {
        const errorCode = error.code;
        console.log(errorCode);
        setError(ERROR_MESSAGE_MAPPING(errorCode));
        setLoading(false);

        // ..
      });
  };
  const onSubmitLoginForm = (e: any) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    let email = e.target[0].value;
    let password = e.target[1].value;

    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        // ...
        setLoading(false);
      })
      .catch(error => {
        const errorCode = error.code;
        console.log(errorCode);
        setError(ERROR_MESSAGE_MAPPING(errorCode));
        setLoading(false);

        // ..
      });
  };

  const createUserWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    const signInMethod = isDesktop ? signInWithPopup : signInWithRedirect;
    signInMethod(auth, provider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential!.accessToken;
        // The signed-in user info.
        // const user = result.user;
        // ...
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        logError(
          error.message,
          error.stack,
          'createUserWithGoogle',
          'signupLoginFlow',
          { errorCode: errorCode }
        );
        setError(errorMessage);
        // The email of the user's account used.
        // const email = error.email;
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const createUserWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    const signInMethod = isDesktop ? signInWithPopup : signInWithRedirect;
    signInMethod(auth, provider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = FacebookAuthProvider.credentialFromResult(result);
        // const token = credential!.accessToken;
        // The signed-in user info.
        // const user = result.user;
        // ...
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        logError(
          error.message,
          error.stack,
          'createUserWithFacebook',
          'signupLoginFlow',
          { errorCode: errorCode }
        );
        setError(errorMessage);
        // The email of the user's account used.
        // const email = error.email;
        // The AuthCredential type that was used.
        // const credential = FacebookAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div className='flex flex-col items-center space-y-4'>
      <Tab.Group
        defaultIndex={signUpOpen === 'signup' ? 0 : 1}
        onChange={index => {
          setError('');
        }}
      >
        <Tab.List className='flex p-1 space-x-16 '>
          <Tab
            className={({ selected }) =>
              classNames(
                'pb-1 leading-5 focus:outline-none focus:ring-2 ring-offset-2 ring-offset-slate-700/5 ring-white ring-opacity-60 border-b-4 border-opacity-10 border-skin-accent hover:border-opacity-100',
                selected ? 'border-opacity-100' : ''
              )
            }
          >
            <Text
              styleClasses='text-base xl:text-4xl font-light'
              content='Signup'
            />
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'pb-1 leading-5 focus:outline-none focus:ring-2 ring-offset-2 ring-offset-slate-700/5 ring-white ring-opacity-60 border-b-4 border-opacity-10 border-skin-accent hover:border-opacity-100',
                selected ? 'border-opacity-100' : ''
              )
            }
          >
            <Text
              styleClasses='text-base xl:text-4xl font-light'
              content='Login'
            />
          </Tab>
        </Tab.List>
        <Tab.Panels className='w-full max-w-xs'>
          <Tab.Panel
            className={classNames(
              'rounded-xl',
              'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
            )}
          >
            <form
              className='flex flex-col space-y-3 items-center'
              onSubmit={onSubmitSignupForm}
            >
              <input
                type='email'
                id='email'
                placeholder='E-mail'
                className='rounded-lg w-full'
              />
              <input
                type='password'
                id='password'
                placeholder='password'
                className='rounded-lg w-full'
              />
              <input
                type='password'
                id='confirm'
                placeholder='confirm password'
                className='rounded-lg w-full'
              />
              <Button
                text='Signup'
                styleClasses=' w-48'
                type='submit'
                loading={loading}
              />
            </form>
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              ' rounded-xl w-full',
              'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
            )}
          >
            <form
              className='flex flex-col space-y-3 items-center'
              onSubmit={onSubmitLoginForm}
            >
              <input
                type='email'
                id='email'
                placeholder='E-mail'
                className='rounded-lg w-full'
              />
              <input
                type='password'
                id='password'
                placeholder='password'
                className='rounded-lg w-full'
              />
              <Button
                text='Login'
                styleClasses=' w-48'
                type='submit'
                loading={loading}
              />
              <Button
                text='Forgot Password?'
                styleClasses='text-xs'
                defautStyle='cust-btn-link'
                onClick={() => {
                  setStep(4);
                }}
              />
            </form>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      {error && (
        <Text
          content={error}
          styleClasses='text-center !text-xs text-skin-error'
        />
      )}

      <hr className='w-full bg-skin-inverted' />
      <Text
        content={'or use a social login'}
        styleClasses='text-center !text-xs'
      />
      <div className='flex space-x-4'>
        <Button
          icon={{ iconName: 'Google' }}
          text='Google'
          styleClasses='text-lg'
          onClick={createUserWithGoogle}
        />
        <Button
          icon={{ iconName: 'Facebook' }}
          text='Facebook'
          styleClasses='text-lg'
          onClick={createUserWithFacebook}
        />
      </div>
    </div>
  );
};

export default SignupLoginFlow;
