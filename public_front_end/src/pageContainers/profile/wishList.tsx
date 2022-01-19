import React from 'react';
import { Text } from '../../components';
import ProductListItemMini from '../../components/Reusable/ProductListItem/listItemMini';

const WishListSection = () => {
  return (
    <div id={'wishlist'}>
      <Text content='This is a public wishlist. Your connections can choose to gift you one of these items.' />
      <div className='grid grid-cols-1 xl:grid-cols-6 gap-2 w-full'>
        <ProductListItemMini title={{ content: 'text' }} />
        <ProductListItemMini title={{ content: 'text' }} />
        <ProductListItemMini title={{ content: 'text' }} />
        <ProductListItemMini title={{ content: 'text' }} />
        <ProductListItemMini title={{ content: 'text' }} />
        <ProductListItemMini title={{ content: 'text' }} />
        <ProductListItemMini title={{ content: 'text' }} />
      </div>
    </div>
  );
};

export default WishListSection;
