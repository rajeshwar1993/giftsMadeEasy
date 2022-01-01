import React from 'react';
import ProductListItem from '../../component_overrides/ProductListItem';

const ProductListing = () => {
  return (
    <div className='grid grid-cols-1 xl:grid-cols-3 gap-6 w-full'>
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
