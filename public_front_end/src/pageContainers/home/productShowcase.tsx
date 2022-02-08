import React, { FC } from 'react';
import { SectionTitle } from '../../components';
import AppLink from '../../components/Reusable/AppLink';
import ProductListItemMini from '../../components/Reusable/ProductListItem/listItemMini';
import { ProductListItemType } from '../../components/Reusable/ProductListItem/type';

export interface Props {
  title: string;
  seeAllLink: string;
  products: Array<ProductListItemType>;
  seeAllTitle?: string;
}

const ProductShowcase: FC<Props> = ({
  title,
  seeAllLink,
  products,
  seeAllTitle
}) => {
  return (
    <article className='flex flex-col space-y-4'>
      <div className='flex flex-row justify-between items-end'>
        <SectionTitle
          content={title}
          wrapperClasses='mb-0'
          styleClasses='text-2xl '
          tag='h2'
        />
        <AppLink
          text={seeAllTitle || 'See All'}
          link={seeAllLink}
          styleClasses='text-sm'
          wrapperClasses='pt-8 hidden md:block'
        />
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'>
        {products &&
          products.map(p => {
            return (
              <ProductListItemMini
                {...p}
                key={p.objectID}
                objectID={p.objectID}
              />
            );
          })}
      </div>

      <AppLink
        text={seeAllTitle || 'See All'}
        link={seeAllLink}
        styleClasses=''
        wrapperClasses='pt-8 md:hidden'
      />
    </article>
  );
};

export default ProductShowcase;
