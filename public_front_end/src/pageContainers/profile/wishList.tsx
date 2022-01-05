import React from 'react';
import { SectionTitle, Text } from '../../components';
import ProductListItem from '../../components/Reusable/ProductListItem';

const WishListSection = () => {
  return (
    <div id={'wishlist'}>
      <SectionTitle content='Wishlist' />
      <Text content="Your wishlist where you can add items you'd like as a gift. It can be seen by people in who's circle you are." />
      <div className='grid grid-cols-1 xl:grid-cols-4 gap-6 w-full'>
        <ProductListItem title={{ content: 'text' }} />
        <ProductListItem title={{ content: 'text' }} />
        <ProductListItem title={{ content: 'text' }} />
        <ProductListItem title={{ content: 'text' }} />
        <ProductListItem title={{ content: 'text' }} />
        <ProductListItem title={{ content: 'text' }} />
        <ProductListItem title={{ content: 'text' }} />
      </div>
    </div>
  );
};

export default WishListSection;
