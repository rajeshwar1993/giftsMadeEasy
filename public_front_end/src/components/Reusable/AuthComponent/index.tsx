import React, { FC, Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { app_toggle_isSigupOpen } from '../../../redux/appCommon';
import { RootState, useAppDispatch } from '../../../redux/store';
import DialogContainer from '../DialogContainer';
import BasicDetailsFlow from './basicDetailsFlow';
import ForgotPassword from './forgotPassword';
import PhoneVerification from './phoneVerification';
import SignupLoginFlow from './signupLoginFlow';

type Props = {
  open: boolean;
  closeModal: () => void;
};

const AuthComponent: FC<Props> = ({ open, closeModal }) => {
  const user = useSelector((state: RootState) => state.user.data);
  const dispatch = useAppDispatch();

  const [step, setStep] = useState<number>(1);

  useEffect(() => {
    if (!user) {
      setStep(1);
    } else if (user && user.name && user.phoneNumber) {
      dispatch(app_toggle_isSigupOpen(false));
    } else if (user && user.name) {
      setStep(3);
    } else if (user) {
      setStep(2);
    }
  }, [user]);

  useEffect(() => {
    if (open) {
      setStep(1);
    }
  }, [open]);

  return (
    <DialogContainer
      open={open}
      closeModal={step === 2 || step === 3 ? () => {} : closeModal}
    >
      {step === 1 && <SignupLoginFlow setStep={setStep} />}
      {step === 2 && user && <BasicDetailsFlow userId={user.uid} />}
      {step === 3 && user && <PhoneVerification close={closeModal} />}
      {step === 4 && <ForgotPassword setStep={setStep} close={closeModal} />}
    </DialogContainer>
  );
};

export default AuthComponent;
