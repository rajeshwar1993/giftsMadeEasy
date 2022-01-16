import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { app_toggle_isSigupOpen } from '../../../redux/appCommon';
import { RootState, useAppDispatch } from '../../../redux/store';
import BasicDetailsFlow from './basicDetailsFlow';
import PhoneVerification from './phoneVerification';
import SignupLoginFlow from './signupLoginFlow';

const AuthComponent = () => {
  const user = useSelector((state: RootState) => state.user.data);
  const dispatch = useAppDispatch();

  const [step, setStep] = useState<number>(1);

  useEffect(() => {
    if (!user) {
      setStep(1);
    } else if (user && user.name && user.phoneNumber) {
      // TODO if phone number is also done
      dispatch(app_toggle_isSigupOpen(false));
    } else if (user && user.name) {
      setStep(3);
    } else if (user) {
      setStep(2);
    }
  }, [user]);

  return (
    <>
      {step === 1 && <SignupLoginFlow />}
      {step === 2 && user && <BasicDetailsFlow userId={user.uid} />}
      {step === 3 && user && <PhoneVerification />}
    </>
  );
};

export default AuthComponent;
