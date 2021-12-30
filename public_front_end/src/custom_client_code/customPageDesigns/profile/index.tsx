import React from 'react';
import AllComponents from '../../../core_custom_mixer/components';

const { ImageComponent, Text, Button } = AllComponents;

const ProfilePage = () => {
  return (
    <section>
      <div className='flex flex-col xl:flex-row'>
        {/* left section */}
        <div className='flex flex-row xl:flex-col xl:w-1/5 w-full justify-center items-center'>
          <div className='shadow-lg overflow-hidden border-4 rounded-full w-64 h-w-64 xl:w-full xl:h-full'>
            <ImageComponent
              src='/images/person.jpg'
              alt='Aditya Vikram Chatterjee'
            />
          </div>
          <div className='p-2 flex flex-col justify-center items-center w-full'>
            <Text
              content='Aditya Vikram Chatterjee'
              tag='h1'
              styleClasses='text-xl font-semibold'
              wrapperStyleClasses='my-2'
            />
            <Button
              text='Add To Circle'
              wrapperClasses='w-full my-2'
              styleClasses='w-full'
              onClick={() => {}}
            />
          </div>
        </div>
        {/* right section */}
        <div className='xl:w-4/5 p-2'>
          <Text
            content='About'
            tag='h1'
            styleClasses='text-xl font-semibold'
            wrapperStyleClasses='my-2'
          />
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
