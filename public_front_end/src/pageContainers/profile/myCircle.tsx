import React from 'react';
import { Button, Text } from '../../components';
import ProfileGlance from '../../components/Reusable/ProfileGlance';

const MyCircle = () => {
  return (
    <div className='grid grid-cols-2 xl:grid-cols-4 gap-x-4 gap-y-8'>
      <div className='flex flex-col space-y-10 justify-center items-center'>
        <Button
          icon={{
            iconName: 'Add',
            size: '40'
          }}
          defautStyle='cust-btn-btn'
          onClick={() => {}}
          styleClasses='text-lg !rounded-full !py-2 !px-2'
          wrapperClasses='mx-2'
        />
        <Text content='Add to Circle' />
      </div>
      <ProfileGlance />
      <ProfileGlance />
      <ProfileGlance />
      <ProfileGlance />
      <ProfileGlance />
      <ProfileGlance />
      <ProfileGlance />
    </div>
  );
};

export default MyCircle;
