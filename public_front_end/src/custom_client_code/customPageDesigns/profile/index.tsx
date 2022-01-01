import React from 'react';
import AllComponents from '../../../core_custom_mixer/components';
import ProfileDetailsSection from './profileDetailsSection';
import ProfileImageSection from './profileImageSection';

const { ImageComponent, Text, Button } = AllComponents;

const ProfilePage = () => {
  return (
    <section>
      <div className='flex flex-col xl:flex-row'>
        {/* left section */}
        <div className=' xl:w-1/5 w-full'>
          <ProfileImageSection />
        </div>
        {/* right section */}
        <div className='xl:w-4/5 xl:pl-16'>
          <ProfileDetailsSection />
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
