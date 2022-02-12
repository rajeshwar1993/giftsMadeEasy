import React, { FC, useState } from 'react';
import { Button, Text } from '../../';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../firebase';
import { ERROR_MESSAGE_MAPPING } from '../../../common/constants';
import { logError } from '../../../common/utils';

type Props = {
  setStep: Function;
  close: Function;
};

const ForgotPassword: FC<Props> = ({ setStep, close }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const [mailSent, setMailSent] = useState(false);

  const handleForgotPasswordSubmit = (e: any) => {
    try {
      e.preventDefault();
      setLoading(true);
      let email = e.target[0].value;
      sendPasswordResetEmail(auth, email)
        .then(() => {
          // Password reset email sent!
          // ..
          setLoading(false);
          setMailSent(true);
        })
        .catch(error => {
          console.log(error);
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(ERROR_MESSAGE_MAPPING(errorCode));
          setLoading(false);
          // ..
        });
    } catch (e: any) {
      logError(
        e.message,
        e.stack,
        'handleForgotPasswordSubmit',
        'ForgotPassword',
        {}
      );
      setError('Unknown error occured. Please try again.');
    }
  };

  return (
    <form
      className='flex flex-col space-y-6 items-center'
      onSubmit={handleForgotPasswordSubmit}
    >
      <input
        type='email'
        id='email'
        placeholder='E-mail'
        className='rounded-lg w-full'
        required
      />
      {!mailSent && (
        <Button
          text='Send Reset Link'
          styleClasses=' w-48'
          type='submit'
          loading={loading}
        />
      )}
      {!mailSent && (
        <Button
          icon={{
            iconName: 'ArrowBack',
            size: '16'
          }}
          text='back'
          styleClasses='text-sm w-48 !border-b-0'
          defautStyle='cust-btn-link'
          onClick={() => {
            setStep(1);
          }}
        />
      )}

      {mailSent && (
        <Text
          content={'Password reset mail sent. Please check your mailbox.'}
        />
      )}
      {error && (
        <Text
          content={error}
          styleClasses='text-center !text-xs text-skin-error'
        />
      )}
      {mailSent && (
        <Button
          text='Close'
          styleClasses=' w-48'
          onClick={() => {
            close();
          }}
        />
      )}
    </form>
  );
};

export default ForgotPassword;
