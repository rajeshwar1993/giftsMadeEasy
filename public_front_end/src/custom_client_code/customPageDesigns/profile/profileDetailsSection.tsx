import React from 'react';
import AllComponents from '../../../core_custom_mixer/components';
import Badge from '../../component_overrides/Bagde';
import BookmarksSection from './bookmakrs';
import WishListSection from './wishList';

const { ImageComponent, Text, Button, SectionTitle } = AllComponents;

const ProfileDetailsSection = () => {
  return (
    <div>
      <SectionTitle content='About' />

      <div className='mb-10'>
        <Text
          content='Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.'
          tag='h3'
          styleClasses='text-xl'
        />
      </div>
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
