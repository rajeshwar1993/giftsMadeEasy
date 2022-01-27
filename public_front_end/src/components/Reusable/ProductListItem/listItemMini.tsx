import Link from 'next/link';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { ImageComponent, Text } from '../../../components';
import { RootState } from '../../../redux/store';
import Icon from '../Icon';

import { ProductListItemType as Props } from './type';

const ProductListItemMini: FC<Props> = ({ t, piu, path }) => {
  const isDesktop = useSelector((state: RootState) => state.app.isDesktop);

  return (
    <Link href={path}>
      <div className='pt-4 cursor-pointer transition-all duration-200 rounded-lg xl:p-4 xl:hover:shadow-2xl'>
        <div className={`flex flex-row xl:flex-col xl:space-y-4 `}>
          <div className='rounded-lg overflow-hidden'>
            <ImageComponent
              src={piu[0] || '/images/product.jpg'}
              alt={t}
              width={isDesktop ? 200 : 100}
              height={isDesktop ? 200 : 100}
              layout='intrinsic'
            />
          </div>
          <div className='flex flex-col justify-between space-y-3 pl-3 w-[70%] xl:w-full xl:pl-0'>
            <Text
              tag='h4'
              content={t}
              styleClasses='font-semibold text-sm line-clamp-4'
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductListItemMini;
