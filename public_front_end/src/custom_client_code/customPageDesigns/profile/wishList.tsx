import React from 'react';
import AllComponents from '../../../core_custom_mixer/components';

const { SectionTitle, Text } = AllComponents;

const WishListSection = () => {
  return (
    <div>
      <SectionTitle content='Wishlist' />
      <Text content="Your wishlist where you can add items you'd like as a gift. It can be seen by people in who's circle you are." />
    </div>
  );
};

export default WishListSection;
