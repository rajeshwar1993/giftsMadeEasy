import React from 'react';
import SearchProductItem from './searchProductItem';

const ProductListing = () => {
  return (
    <div className='grid grid-cols-1 xl:grid-cols-3 gap-6 w-full'>
      <SearchProductItem />
      <SearchProductItem />
      <SearchProductItem />
      <SearchProductItem />
      <SearchProductItem />
      <SearchProductItem />
      <SearchProductItem />
    </div>
  );
};

export default ProductListing;
