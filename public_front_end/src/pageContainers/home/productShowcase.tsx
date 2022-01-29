import React, { FC, Suspense } from 'react';
import { Button, SectionTitle } from '../../components';
import ProductListItemMini from '../../components/Reusable/ProductListItem/listItemMini';
import { ProductListItemType } from '../../components/Reusable/ProductListItem/type';

type Props = {
  title: string;
  seeAllLink: string;
  products: Array<ProductListItemType>;
  seeAllTitle?: string;
};

const ProductShowcase: FC<Props> = ({
  title,
  seeAllLink,
  products,
  seeAllTitle
}) => {
  return (
    <div className='flex flex-col space-y-4'>
      <div className='flex flex-row justify-between items-end'>
        <SectionTitle
          content={title}
          wrapperClasses='mb-0'
          styleClasses='text-2xl '
        />
        <Button
          text={seeAllTitle || 'See All'}
          link={seeAllLink}
          defautStyle='cust-btn-link'
          styleClasses='text-sm'
          wrapperClasses='pt-8 hidden md:block'
        />
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'>
        {products.map(p => {
          return <ProductListItemMini {...p} />;
        })}
      </div>

      <Button
        text={seeAllTitle || 'See All'}
        link={seeAllLink}
        defautStyle='cust-btn-link'
        styleClasses=''
        wrapperClasses='pt-8 md:hidden'
      />
    </div>
  );
};

export default ProductShowcase;
