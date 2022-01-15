import Link from 'next/link';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Button, ImageComponent, Text } from '../../../components';
import { RootState } from '../../../redux/store';
import Icon from '../Icon';

import { ProductListItemType as Props } from './type';

const ProductListItem: FC<Props> = ({
  title,
  price = '1199',
  ogPrice = '4999'
}) => {
  const isDesktop = useSelector((state: RootState) => state.app.isDesktop);

  return (
    <Link href={'/product/77g6WRTeg1aMtbqHluvD'}>
      <div className='pt-4 cursor-pointer transition-all duration-200 rounded-lg xl:p-4 xl:hover:shadow-2xl'>
        <div className={`flex flex-row xl:flex-col xl:space-y-4 `}>
          <div className='rounded-lg overflow-hidden'>
            <ImageComponent
              src='/images/product.jpg'
              alt='product name'
              width={isDesktop ? 400 : 200}
              height={isDesktop ? 400 : 200}
              layout='intrinsic'
            />
          </div>
          <div className='flex flex-col justify-between space-y-3 pl-3 w-[70%] xl:w-full xl:pl-0'>
            <Text
              tag='h4'
              content='2020 Apple iPad Air with A14 Bionic chip (10.9-inch/27.69 cm, Wi-Fi, 256GB) - Space Grey (4th Generation)'
              styleClasses='font-semibold text-base line-clamp-4'
            />
            <div className='flex justify-between items-end'>
              <div className='flex flex-col'>
                <Text
                  content={'MRP: ' + ogPrice}
                  styleClasses='text-xs font-light line-through'
                />
                <Text
                  tag='span'
                  content={`Rs ${price}`}
                  styleClasses='text-2xl'
                />
              </div>

              <div className='mb-1 flex items-center p-0.5 bg-skin-fill bottom-4 right-2 rounded-lg'>
                <Icon iconName='Star' size='26' />
                <Text
                  content={'4.7'}
                  styleClasses='ml-1 text-lg !font-semibold'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='mt-2'>
          <Text
            content="This product is in your recipeint's wishlist!"
            styleClasses='font-bold text-sm'
          />
        </div>
      </div>
    </Link>
  );
};

export default ProductListItem;
