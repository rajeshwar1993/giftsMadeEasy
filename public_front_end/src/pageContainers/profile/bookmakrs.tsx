import React from 'react';
import { SectionTitle, Text } from '../../components';
import ProductListItem from '../../components/Reusable/ProductListItem';

const BookmarksSection = () => {
  return (
    <div id={'bookmarks'}>
      <Text content='This is a private list, helpful for keeping items you want to give as gifts.' />
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

export default BookmarksSection;
