import React, { FC } from 'react';
import ProductListItem from '../../components/Reusable/ProductListItem';
import { ProductListItemType } from '../../components/Reusable/ProductListItem/type';

type Props = {
  results: Array<ProductListItemType>;
};

const ProductListing: FC<Props> = ({ results }) => {
  return (
    <div className='grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 lg:gap-8 w-full'>
      {results.map(r => (
        <ProductListItem key={r.objectID} {...r} />
      ))}
    </div>
  );
};

export default ProductListing;
