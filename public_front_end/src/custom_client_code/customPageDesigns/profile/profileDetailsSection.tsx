import React from 'react';
import AllComponents from '../../../core_custom_mixer/components';
import Badge from '../../component_overrides/Bagde';
import BookmarksSection from './bookmakrs';
import ProfileAboutSection from './profileAboutSection';
import ProfileImpDatesSection from './profileImpDates';
import ProfileInterestedInSection from './profileInteredtedInSection';
import WishListSection from './wishList';

const { Button, SectionTitle } = AllComponents;

const ProfileDetailsSection = () => {
  return (
    <div>
      {/* About Section */}
      <ProfileAboutSection
        text={'This is the sample text'}
        onSaveClick={(t: string) => {
          console.log(t);
        }}
      />
      {/* Likes */}
      <ProfileInterestedInSection
        ints={[
          {
            id: '1',
            text: 'Tech'
          },
          {
            id: '2',
            text: 'Tech'
          },
          {
            id: '3',
            text: 'Tech'
          },
          {
            id: '4',
            text: 'Tech'
          }
        ]}
        onSaveClick={() => {}}
      />
      <div className='mb-10'>
        <ProfileImpDatesSection
          text={'This is the sample text'}
          onSaveClick={(t: string) => {
            console.log(t);
          }}
        />
      </div>
      <div className='mb-10'>
        <WishListSection />
      </div>
      <div className='mb-10'>
        <BookmarksSection />
      </div>
    </div>
  );
};

export default ProfileDetailsSection;
