import React from 'react';
import { Text, ImageComponent } from '../..';
import Button from '../Button';

const ProfileGlance = () => {
  return (
    <div className='flex flex-col items-center text-center'>
      <div className='shadow-lg w-24 h-24 xl:w-32 xl:h-32 overflow-hidden border-4 rounded-full'>
        <ImageComponent src={'/images/person.jpg'} alt={'alt'} />
      </div>

      <Text
        content={'Rajeshwar Rudra'}
        tag='h3'
        styleClasses='text-xl font-semibold'
      />
      <Text content={'Brother'} tag='h3' styleClasses='text-lg font-light' />
      <Button text='Find Gifts' defautStyle='cust-btn-link' />
    </div>
  );
};

export default ProfileGlance;
