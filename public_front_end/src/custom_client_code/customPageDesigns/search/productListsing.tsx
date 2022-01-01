import React from 'react';
import ProductListItem from '../../component_overrides/ProductListItem';

const ProductListing = () => {
  return (
    <div className='grid grid-cols-1 xl:grid-cols-3 gap-6 w-full'>
      <ProductListItem />
      <ProductListItem />
      <ProductListItem />
      <ProductListItem />
      <ProductListItem />
      <ProductListItem />
      <ProductListItem />
    </div>
  );
};

export default ProductListing;
