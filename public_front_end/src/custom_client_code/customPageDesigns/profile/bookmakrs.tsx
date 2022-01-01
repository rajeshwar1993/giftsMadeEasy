import React from 'react';
import AllComponents from '../../../core_custom_mixer/components';
import ProductListItem from '../../component_overrides/ProductListItem';

const { SectionTitle, Text } = AllComponents;

const BookmarksSection = () => {
  return (
    <div>
      <SectionTitle content='Bookmarks' />
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
