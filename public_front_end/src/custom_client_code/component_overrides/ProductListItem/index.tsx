import React from 'react';
import AllComponents from '../../../core_custom_mixer/components';

const { ImageComponent, Text } = AllComponents;

const ProductListItem = () => {
  return (
    <div className='xl:p-4 w-full cursor-pointer xl:hover:shadow-2xl transition-all rounded-lg'>
      <div className='rounded-lg overflow-hidden '>
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

export default ProductListItem;
