import React from 'react';
import AllComponents from '../../../core_custom_mixer/components';
import Badge from '../../component_overrides/Bagde';
import BookmarksSection from './bookmakrs';
import ProfileAboutSection from './profileAboutSection';
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
      <div className='mb-10'>
        <SectionTitle content='Interested In' />

        <div className='mb-2'>
          <Badge
            text={{
              content: 'Tech'
            }}
          />
          <Badge
            text={{
              content: 'Art'
            }}
          />
          <Badge
            text={{
              content: 'Travel'
            }}
          />
          <Badge
            text={{
              content: 'Books'
            }}
          />
        </div>
        <Button
          text='Find Gifts for Aditya Vikram Chatterjee'
          link={'/search'}
          defautStyle='cust-btn-link'
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
