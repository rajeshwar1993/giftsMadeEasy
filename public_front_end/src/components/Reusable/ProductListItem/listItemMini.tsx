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
    <div className='pt-4 transition-all duration-200 rounded-lg lg:p-4 lg:hover:shadow-2xl border-skin-primary border-opacity-0 lg:hover:border-opacity-30 border-2'>
      <div
        className={`flex flex-col space-y-6 items-center h-full justify-between `}
      >
        <Link href={path}>
          <div className='cursor-pointer space-y-2'>
            <div className='rounded-lg overflow-hidden'>
              <ImageComponent
                src={piu[0] || '/images/product.jpg'}
                alt={t}
                width={isDesktop ? 400 : 300}
                height={isDesktop ? 400 : 300}
                layout='intrinsic'
              />
            </div>
            <div className='flex flex-col justify-between space-y-4 px-4 w-full lg:pl-0'>
              <Text
                tag='h4'
                content={t}
                styleClasses='font-semibold text-base line-clamp-4'
              />
            </div>
          </div>
        </Link>

        {/* <div className='mt-2 flex space-x-4 items-center'>
          <div className='grid grid-col-3'>
            {['test', 'test', 'test', 'test', 'test', 'test'].map(
              (user, i) => (
                <div className={classNames('rounded-full overflow-hidden')}>
                  <ImageComponent
                    src={'/images/person.jpg'}
                    alt={'test'}
                    height={20}
                    width={20}
                    layout='fixed'
                  />
                </div>
              )
            )}
          </div>

          <Text
            content="This product is in your recipeint's wishlist!"
            styleClasses='font-light text-sm'
          />
        </div> */}
      </div>
    </div>
  );
};

export default ProductListItemMini;
