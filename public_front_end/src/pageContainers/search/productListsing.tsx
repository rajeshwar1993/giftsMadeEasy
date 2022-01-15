import React from 'react';
import ProductListItem from '../../components/Reusable/ProductListItem';

const ProductListing = () => {
  return (
    <div className='grid grid-cols-1 xl:grid-cols-3 gap-8 w-full'>
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
