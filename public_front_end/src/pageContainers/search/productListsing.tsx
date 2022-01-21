import React from 'react';
import ProductListItem from '../../components/Reusable/ProductListItem';

const ProductListing = () => {
  return (
    <div className='grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 lg:gap-8 w-full'>
      <ProductListItem title={{ content: 'text' }} />
      <ProductListItem title={{ content: 'text' }} />
      <ProductListItem title={{ content: 'text' }} />
      <ProductListItem title={{ content: 'text' }} />
      <ProductListItem title={{ content: 'text' }} />
      <ProductListItem title={{ content: 'text' }} />
      <ProductListItem title={{ content: 'text' }} />
    </div>
  );
};

export default ProductListing;
