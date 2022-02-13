import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { FS_CONTACT_DB } from '../../common/constants';
import { Button, SectionTitle } from '../../components';
import { db } from '../../firebase';
import { ContactDBKeys } from '../../common/dbKeys';
import { useAppDispatch } from '../../redux/store';
import { app_sendToast } from '../../redux/appCommon';
import { checkRateLimiter, logError, setRateLimiter } from '../../common/utils';

const ContactUsWrapper = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();

      if (!checkRateLimiter(30)) {
        // console.log('Too soon.');
        return;
      }

      setLoading(true);
      const email = e.target[0].value;
      const subject = e.target[1].value;
      const message = e.target[2].value;

      const colRef = collection(db, FS_CONTACT_DB);
      await addDoc(colRef, {
        [ContactDBKeys.email]: email,
        [ContactDBKeys.subject]: subject,
        [ContactDBKeys.message]: message,
        [ContactDBKeys.createdTS]: serverTimestamp()
      });

      dispatch(
        app_sendToast({
          type: 'info',
          message: 'Message Sent!'
        })
      );

      // setting rate limiter
      setRateLimiter();

      // reset form
      e.target.reset();
    } catch (e: any) {
      logError(e.message, e.stack, 'handleSubmit', 'ContactUsWrapper', {});
      dispatch(
        app_sendToast({
          type: 'error',
          message: 'Error in sending message, please try again.'
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col space-y-4 max-w-md'>
      <SectionTitle content='Contact us' />
      <input
        type='email'
        id='userEmail'
        className='rounded-lg w-full'
        placeholder={`Email-Id`}
        required
      />
      <input
        type='text'
        id='sub'
        className='rounded-lg w-full'
        placeholder={`Subject`}
        required
      />
      <textarea
        placeholder='Your message...'
        rows={6}
        className='w-full rounded-lg'
        required
      />
      <Button text='Send' type='submit' loading={false} />
    </form>
  );
};

export default ContactUsWrapper;
