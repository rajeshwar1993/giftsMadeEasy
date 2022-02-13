import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { FC, Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FS_INVITATIONS_DB } from '../../../common/constants';
import { InvitationsDBKeys } from '../../../common/dbKeys';
import { logError } from '../../../common/utils';
import { db } from '../../../firebase';
import { app_sendToast } from '../../../redux/appCommon';
import { RootState, useAppDispatch } from '../../../redux/store';
import Button from '../Button';
import DialogContainer from '../DialogContainer';
import SectionTitle from '../SectionTitle';
import Text from '../Text';

type Props = {
  open: boolean;
  closeModal: () => void;
};

const InvitationComponent: FC<Props> = ({ open, closeModal }) => {
  const user = useSelector((state: RootState) => state.user.data);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!user) {
      dispatch(
        app_sendToast({
          type: 'error',
          message: 'Please login first.'
        })
      );
      return;
    }
    try {
      const email = e.target[0].value;
      setLoading(true);

      // TODO -  call a cloud function to send the invitation mail

      const colRef = collection(db, FS_INVITATIONS_DB);
      await addDoc(colRef, {
        [InvitationsDBKeys.fromID]: user?.uid,
        [InvitationsDBKeys.fromName]: user?.name,
        [InvitationsDBKeys.toEmail]: email,
        [InvitationsDBKeys.createdTS]: serverTimestamp()
      });

      dispatch(app_sendToast({ type: 'info', message: 'Invitation sent.' }));
    } catch (e: any) {
      logError(e.message, e.stack, 'handleSubmit', 'InvitationComponent', {});
      dispatch(
        app_sendToast({
          type: 'error',
          message: 'Error in sending invitation.'
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogContainer open={open} closeModal={closeModal}>
      <SectionTitle content='Invite' />
      <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
        <Text content='Email of the person you want to invite' />
        <input
          type='email'
          id='email'
          className='rounded-lg w-full'
          placeholder={`Email-id`}
          required
          disabled={loading}
        />
        <Button text='Send' type='submit' loading={loading} />
      </form>
    </DialogContainer>
  );
};

export default InvitationComponent;
