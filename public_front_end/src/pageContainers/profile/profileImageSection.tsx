import React from 'react';
import { Button, ImageComponent, Text } from '../../components';

const ProfileImageSection = () => {
  return (
    <div className='flex flex-row xl:flex-col justify-center items-center'>
      <div className='relative shadow-lg overflow-hidden border-4 rounded-full w-64 h-w-64 xl:w-full xl:h-full'>
        <ImageComponent
          src='/images/person.jpg'
          alt='Aditya Vikram Chatterjee'
        />
        <div className='absolute bottom-2 left-12 xl:left-[40%]'>
          <Button
            icon={{
              iconName: 'Camera'
            }}
            defautStyle='cust-btn-btn'
            onClick={() => {}}
            styleClasses='text-lg !rounded-full !py-2 !px-2 bg-skin-fill'
            wrapperClasses='mx-2'
          />
        </div>
      </div>
      <div className='p-2 flex flex-col justify-center items-center w-full'>
        <div className='my-2 text-center'>
          <Text
            content='Aditya Vikram Chatterjee'
            tag='h1'
            styleClasses='text-2xl font-semibold'
          />
        </div>
        <Button
          text='Add To Circle'
          wrapperClasses='w-full my-2'
          styleClasses='w-full'
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default ProfileImageSection;
