import React from 'react';
import SearchProductItem from './searchProductItem';

const ProductListing = () => {
  return (
    <div className='flex flex-wrap w-full'>
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
