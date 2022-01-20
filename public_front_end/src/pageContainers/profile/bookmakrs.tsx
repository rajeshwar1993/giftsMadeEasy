import React from 'react';
import { SectionTitle, Text } from '../../components';
import ProductListItemMini from '../../components/Reusable/ProductListItem/listItemMini';

const BookmarksSection = () => {
  return (
    <div id={'bookmarks'}>
      <Text content='This is a private list, helpful for keeping items you want to give as gifts.' />
      <div className='grid grid-cols-1 xl:grid-cols-6 gap-2 w-full'>
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

export default BookmarksSection;
