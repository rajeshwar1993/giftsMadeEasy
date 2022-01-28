import React, { FC } from 'react';
import { SectionTitle, Text } from '../../components';
import ProductListItem from '../../components/Reusable/ProductListItem';
import { ProductListItemType } from '../../components/Reusable/ProductListItem/type';

type Props = {
  results: Array<ProductListItemType>;
  loading: boolean;
};

const ProductListing: FC<Props> = ({ results, loading }) => {
  return (
    <>
      {loading && (
        <div className='flex justify-around mt-12'>
          <SectionTitle content='Fetching Results ...' />
        </div>
      )}
      {!loading && (
        <div className='grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-6 xl:grid-cols-3  lg:gap-x-8 w-full'>
          {results.map(r => (
            <ProductListItem key={r.objectID} {...r} />
          ))}
        </div>
      )}
      <Text
        styleClasses='text-xs'
        content={
          '* This is an indicative price. Actual prices will be seen after adding to the actual cart.'
        }
      />
    </>
  );
};

export default ProductListing;
