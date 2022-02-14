import Link from 'next/link';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { ImageComponent, Text } from '../../../components';
import { RootState } from '../../../redux/store';

type Props = {
  objectID: string;
  t: string;
  piu: Array<string>;
};

const ProductListItemMini: FC<Props> = ({ objectID, t, piu }) => {
  const isDesktop = useSelector((state: RootState) => state.app.isDesktop);

  return (
    <div className='pt-4 transition-all duration-200 rounded-lg lg:p-4 lg:hover:shadow-md border-skin-primary border-opacity-0 lg:hover:border-opacity-10 border-2'>
      <div
        className={`flex flex-col space-y-6 items-center h-full justify-between `}
      >
        <Link href={`/products/${objectID}`}>
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
      </div>
    </div>
  );
};

export default ProductListItemMini;
