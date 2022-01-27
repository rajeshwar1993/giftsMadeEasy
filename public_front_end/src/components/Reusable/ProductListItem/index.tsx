import Link from 'next/link';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '../../../common/utils';
import { Button, ImageComponent, Text } from '../../../components';
import { RootState } from '../../../redux/store';
import Icon from '../Icon';

import { ProductListItemType as Props } from './type';

const ProductListItem: FC<Props> = ({ t, p, ogp, piu, r, path, au }) => {
  const isDesktop = useSelector((state: RootState) => state.app.isDesktop);

  return (
    <Link href={path}>
      <div className='pt-4 cursor-pointer transition-all duration-200 rounded-lg lg:p-4 lg:hover:shadow-2xl border-skin-primary border-opacity-0 lg:hover:border-opacity-30 border-2'>
        <div
          className={`flex flex-col space-y-6 items-center h-full justify-between `}
        >
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
            <div className='flex justify-between items-end'>
              <div className='flex flex-col'>
                <Text
                  content={'MRP: ' + ogp}
                  styleClasses='text-xs font-light line-through'
                />
                <Text tag='span' content={`Rs ${p}`} styleClasses='text-2xl' />
              </div>

              <div className='mb-1 flex items-center p-0.5 bg-skin-fill bottom-4 right-2 rounded-lg'>
                <Icon
                  iconName='Star'
                  size='26'
                  styleClasses='text-skin-accent'
                />
                <Text content={r} styleClasses='ml-1 text-lg !font-semibold' />
              </div>
            </div>
          </div>
          <div className='flex flex-row justify-between w-full'>
            <Button text='Buy Now' link={au || path} target='_blank' />
            <Button
              text='See Details'
              link={path}
              defautStyle='cust-btn-link'
            />
          </div>
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
    </Link>
  );
};

export default ProductListItem;
