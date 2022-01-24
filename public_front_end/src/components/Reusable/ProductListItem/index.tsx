import Link from 'next/link';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Button, ImageComponent, Text } from '../../../components';
import { RootState } from '../../../redux/store';
import Icon from '../Icon';

import { ProductListItemType as Props } from './type';

const ProductListItem: FC<Props> = ({ t, p, ogp, piu, r, path }) => {
  const isDesktop = useSelector((state: RootState) => state.app.isDesktop);

  return (
    <Link href={path}>
      <div className='pt-4 cursor-pointer transition-all duration-200 rounded-lg lg:p-4 lg:hover:shadow-2xl'>
        <div className={`flex flex-row lg:flex-col lg:space-y-4 `}>
          <div className='rounded-lg overflow-hidden'>
            <ImageComponent
              src={piu[0] || '/images/product.jpg'}
              alt='product name'
              width={isDesktop ? 400 : 200}
              height={isDesktop ? 400 : 200}
              layout='intrinsic'
            />
          </div>
          <div className='flex flex-col justify-between pl-3 w-[70%] lg:w-full lg:pl-0'>
            <Text
              tag='h4'
              content={t}
              styleClasses='font-semibold text-base line-clamp-4'
            />
            <div className='flex justify-between items-end'>
              <div className='flex flex-col'>
                <Text
                  content={'MRP: ' + ogp}
                  styleClasses='text-xs font-light line-through'
                />
                <Text tag='span' content={`Rs ${p}`} styleClasses='text-2xl' />
              </div>

              <div className='mb-1 flex items-center p-0.5 bg-skin-fill bottom-4 right-2 rounded-lg'>
                <Icon iconName='Star' size='26' />
                <Text content={r} styleClasses='ml-1 text-lg !font-semibold' />
              </div>
            </div>
          </div>
        </div>
        {/* <div className='mt-2'>
          <Text
            content="This product is in your recipeint's wishlist!"
            styleClasses='font-bold text-sm'
          />
        </div> */}
      </div>
    </Link>
  );
};

export default ProductListItem;
