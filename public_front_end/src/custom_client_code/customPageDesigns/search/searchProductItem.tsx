import React from 'react';
import AllComponents from '../../../core_custom_mixer/components';

const { ImageComponent, Text } = AllComponents;

const SearchProductItem = () => {
  return (
    <div className='py-4 px-6 w-full xl:w-1/2 2xl:w-1/3 mb-4 cursor-pointer shadow-sm hover:shadow-2xl transition-all'>
      <div className='rounded-lg overflow-hidden border-2'>
        <ImageComponent src='/images/product.jpg' alt='product name' />
      </div>
      <Text
        tag='h4'
        content='Product Name'
        styleClasses='font-semibold text-lg'
        wrapperStyleClasses='mt-2'
      />
      <Text
        tag='span'
        content='Rs 1499'
        styleClasses='font-light text-lg'
        wrapperStyleClasses='mt-2'
      />
    </div>
  );
};

export default SearchProductItem;
