import React from 'react';
import AllComponents from '../../../core_custom_mixer/components';
import ListBoxComp from '../../component_overrides/ListBox';
import Filters from './filters';
import ProductListing from './productListsing';

const { Text } = AllComponents;

const SearchPage = () => {
  return (
    <section className=''>
      <div className='p-2'>
        <Text content='The search text' />
      </div>
      {/* Filter and List */}
      <div className='flex flex-row mt-4'>
        <div className='w-1/5 pr-2 flex flex-col'>
          <Filters />
        </div>
        <div className='flex flex-row flex-wrap px-4 w-4/5'>
          <ProductListing />
        </div>
      </div>
    </section>
  );
};

export default SearchPage;
