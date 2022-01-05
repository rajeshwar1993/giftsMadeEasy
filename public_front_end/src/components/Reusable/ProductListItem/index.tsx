import React, { FC } from 'react';
import { Button, ImageComponent, Text } from '../../../components';

import { ProductListItemType as Props } from './type';

const ProductListItem: FC<Props> = ({ title, price = '1199' }) => {
  return (
    <div className='pt-4'>
      <div
        className={`flex flex-row xl:flex-col w-full cursor-pointer transition-all duration-200 rounded-lg xl:px-4 xl:hover:shadow-2xl`}
      >
        <div className='rounded-lg overflow-hidden w-[40%] xl:w-full'>
          <ImageComponent src='/images/product.jpg' alt='product name' />
        </div>
        <div className='pl-3 w-[60%] xl:w-full xl:pl-0 xl:mt-4'>
          <Text
            tag='h4'
            content='Product Name can be very log so we need to truncate it'
            styleClasses='font-semibold text-lg'
          />
          <div className='mt-2 flex justify-between items-center'>
            <Text tag='span' content={`Rs ${price}`} styleClasses='text-xl' />
            <div className='flex w-1/3 justify-between'>
              <Button
                icon={{ iconName: 'OutlineFavoriteBorder', size: '24' }}
                onClick={() => {}}
                defautStyle='cust-btn-link'
                styleClasses='!border-b-0'
              />
              <Button
                icon={{ iconName: 'BookmarkBorder', size: '24' }}
                onClick={() => {}}
                defautStyle='cust-btn-link'
                styleClasses='!border-b-0'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='xl:px-4'>
        <Text
          content="This product is in your recipeint's wishlist!"
          styleClasses='font-bold text-sm'
        />
      </div>
    </div>
  );
};

export default ProductListItem;
