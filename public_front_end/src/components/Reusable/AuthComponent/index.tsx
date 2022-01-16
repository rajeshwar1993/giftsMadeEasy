import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Gender } from '../../../models/enums';
import { RootState } from '../../../redux/store';
import BasicDetailsFlow from './basicDetailsFlow';

import SignupLoginFlow from './signupLoginFlow';

const AuthComponent = () => {
  const user = useSelector((state: RootState) => state.user.data);

  const [step, setStep] = useState<number>(1);

  useEffect(() => {
    if (!user) {
      setStep(1);
    } else if (user && user.name && user.phoneNumber) {
      // TODO if phone number is also done
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
      {step === 3 && user && <span>Phone Number</span>}
    </>
  );
};

export default AuthComponent;
