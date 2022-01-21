import * as FBauth from 'firebase/auth';
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  unlink,
  linkWithCredential
} from 'firebase/auth';
import { collection, doc, updateDoc } from 'firebase/firestore';
import React, { FC, useEffect, useRef, useState } from 'react';
import { ERROR_MESSAGE_MAPPING, FS_USER_DB } from '../../../common/constants';
import { UserDBKeys } from '../../../common/dbKeys';
import { db } from '../../../firebase';
import { useAppDispatch } from '../../../redux/store';
import { ur_updateUser } from '../../../redux/user';
import Button from '../Button';
import SectionTitle from '../SectionTitle';
import Text from '../Text';

let recaptchaVerifier: any = null;
let cr: any = null;
let timer: any = null;
let max_timer = 60;

type Props = {
  close: () => void;
};

const PhoneVerification: FC<Props> = ({ close }) => {
  const [sendOTPDisbaled, setSendOTPDisbaled] = useState(true);
  const [showSendOTP, setShowSendOTP] = useState(true);
  const [showVerifySection, setShowVerifySection] = useState(false);
  const [error, setError] = useState('');
  const [timerVal, updateTimerVal] = useState(max_timer);
  const [hasPrevNumber, setHasPrevNumber] = useState(false);
  const auth = getAuth();

  const dispatch = useAppDispatch();

  const timerValRef: any = useRef(null);

  const submitSendOTP = (e: any) => {
    e.preventDefault();

    let phoneNumber = e.target[0].value.trim() + e.target[1].value.trim();
    console.log(phoneNumber);

    if (auth) {
      signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
        .then(confirmationResult => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          cr = confirmationResult;
          setShowVerifySection(true);
          setShowSendOTP(false);
          startResendTimer();
          // console.log(cr);
          recaptchaVerifier.clear();
          // ...
        })
        .catch(error => {
          // Error; SMS not sent
          // ...
          const errorCode = error.code;
          setError(ERROR_MESSAGE_MAPPING(errorCode));
          recaptchaVerifier.clear();
          setShowSendOTP(true);
        });
    }
  };

  const unlinkOrCreateNewPhoneAuth = (e: any) => {
    e.preventDefault();
    const otp = e.target[0].value.trim();

    if (auth.currentUser && hasPrevNumber) {
      unlink(auth.currentUser, 'phone')
        .then(() => {
          // console.log('Unlink Success');
          verifyPhoneAuth(otp);
        })
        .catch(error => {
          console.log(error);
          setError(ERROR_MESSAGE_MAPPING(error.code));
        });
    } else {
      verifyPhoneAuth(otp);
    }
  };

  const verifyPhoneAuth = (otp: string) => {
    var credential = FBauth.PhoneAuthProvider.credential(
      cr.verificationId,
      otp
    );

    if (auth.currentUser) {
      linkWithCredential(auth.currentUser, credential)
        .then(async (result: any) => {
          // console.log(result);

          let ext: any = document.getElementById('ext');
          let ph: any = document.getElementById('ph');
          if (ext && ph) {
            ext = ext.value;
            ph = ph.value;

            const userRef = collection(db, FS_USER_DB);
            await updateDoc(doc(userRef, auth.currentUser?.uid), {
              [UserDBKeys.phoneExt]: ext,
              [UserDBKeys.phoneNumber]: ph
            });

            dispatch(ur_updateUser({ key: UserDBKeys.phoneExt, value: ext }));
            dispatch(ur_updateUser({ key: UserDBKeys.phoneNumber, value: ph }));
          }
        })
        .catch((error: any) => {
          console.log(error);
          setError(ERROR_MESSAGE_MAPPING(error.code));
        });
    }
  };

  const startResendTimer = () => {
    timerValRef.current = max_timer;
    timer = setInterval(() => {
      let v = timerValRef.current - 1;
      if (v <= 0) {
        clearInterval(timer);
        setShowSendOTP(true);
        updateTimerVal(max_timer);
      }
      updateTimerVal(v);
      timerValRef.current = v;
    }, 1000);
  };

  useEffect(() => {
    if (!showSendOTP) {
      return;
    }

    recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'normal',
        callback: (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // console.log('Captcha successful!!', response);
          setSendOTPDisbaled(false);
        },
        'expired-callback': () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
          // console.log('Captcha expired');
          // TODO: handle this error
          setSendOTPDisbaled(true);
        }
      },
      auth
    );
    recaptchaVerifier.render().then((widgetId: any) => {
      // recaptchaWidgetId = widgetId;
      // console.log('widgetId: ', widgetId);
    });
  }, [showSendOTP]);

  useEffect(() => {
    let currentUser: any = auth.currentUser;
    currentUser?.providerData.forEach((pd: any) => {
      if (pd.providerId === 'phone') {
        setHasPrevNumber(true);
      }
    });
  }, []);

  return (
    <div className='flex flex-col items-center space-y-4'>
      <div>
        <SectionTitle content='Phone Verification' wrapperClasses='mb-0' />
        <Text
          styleClasses='text-xs'
          content='We do not display your phone number on your profile.'
        />
      </div>
      <form
        onSubmit={submitSendOTP}
        className='flex flex-col items-center space-y-4'
      >
        <div className='flex flex-row space-x-4'>
          <input
            type='text'
            id='ext'
            placeholder=''
            defaultValue='+91'
            className='rounded-lg w-16'
            required
            disabled={!showSendOTP}
          />
          <input
            type='text'
            id='ph'
            placeholder='Phone Number'
            className='rounded-lg w-full'
            required
            disabled={!showSendOTP}
          />
        </div>

        <>
          <div id='recaptcha-container' />
          {showSendOTP && (
            <Button
              type='submit'
              id='phone-otp-btn'
              text='Send OTP'
              disabled={sendOTPDisbaled}
            />
          )}
        </>

        {!showSendOTP && (
          <Text content={`Resend OTP in ${timerVal}s`} styleClasses='text-sm' />
        )}
      </form>
      {showVerifySection && (
        <form
          onSubmit={unlinkOrCreateNewPhoneAuth}
          className='flex flex-col items-center space-y-4'
        >
          <input
            type='text'
            id='otp'
            placeholder='OTP'
            defaultValue=''
            className='rounded-lg text-center'
            required
          />
          <Button type='submit' text='Verify' />
        </form>
      )}
      {error && (
        <Text
          content={error}
          styleClasses='text-center text-sm text-skin-error'
        />
      )}
      <Button
        wrapperClasses='!mt-12'
        defautStyle='cust-btn-link'
        text='skip for now'
        onClick={() => {
          close();
        }}
        styleClasses='text-xs'
      />
    </div>
  );
};

export default PhoneVerification;
