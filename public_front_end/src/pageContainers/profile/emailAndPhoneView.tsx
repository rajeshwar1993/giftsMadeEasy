import React, { FC, useState } from 'react';
import { Button, Icon, Text } from '../../components';
import PhoneVerification from '../../components/Reusable/AuthComponent/phoneVerification';

type Props = {
  uid: string;
  email: string;
  ext: string;
  phone: string;
};

const EmailAndPhoneView: FC<Props> = ({ uid, email, ext, phone }) => {
  const [editPhone, setEditPhone] = useState(false);

  return (
    <div className='flex flex-col space-y-2 p-2 mb-10'>
      <Text
        content='Email and Phone only visible to you and will be hidden in your public profile.'
        styleClasses='text-xs'
      />
      <div className='flex space-x-4'>
        <Icon iconName='Email' />
        <Text content={email} />
      </div>
      {phone && !editPhone && (
        <div className='flex space-x-4 items-center'>
          <Icon iconName='Phone' />
          <Text content={`${ext} ${phone}`} />
          <Button
            text='change'
            onClick={() => {
              setEditPhone(true);
            }}
            styleClasses='text-xs'
            defautStyle='cust-btn-link'
          />
        </div>
      )}
      {!phone && !editPhone && (
        <Button
          text='Add Phone Number'
          onClick={() => {
            setEditPhone(true);
          }}
          styleClasses=''
          defautStyle='cust-btn-link'
        />
      )}
      {editPhone && (
        <div className='mt-4'>
          <PhoneVerification
            close={() => {
              setEditPhone(false);
            }}
            closeText='cancel'
          />
        </div>
      )}
    </div>
  );
};

export default EmailAndPhoneView;
