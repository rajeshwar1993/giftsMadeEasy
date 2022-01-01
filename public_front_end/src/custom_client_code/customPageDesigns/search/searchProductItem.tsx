import React from 'react';
import AllComponents from '../../../core_custom_mixer/components';

const { ImageComponent, Text } = AllComponents;

const SearchProductItem = () => {
  return (
    <div className='py-4 px-6 w-full mb-4 cursor-pointer hover:shadow-2xl transition-all rounded-lg'>
      <div className='rounded-lg overflow-hidden border-2'>
        <ImageComponent src='/images/product.jpg' alt='product name' />
      </div>
      <div className='mt-2'>
        <Text
          tag='h4'
          content='Product Name'
          styleClasses='font-semibold text-lg'
        />
      </div>
      <div className='mt-2'>
        <Text tag='span' content='Rs 1499' styleClasses='font-light text-lg' />
      </div>
    </div>
  );
};

export default SearchProductItem;
