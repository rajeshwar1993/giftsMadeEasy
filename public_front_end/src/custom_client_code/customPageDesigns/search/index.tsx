import React from 'react';
import AllComponents from '../../../core_custom_mixer/components';
import Filters from './filters';
import ProductListing from './productListsing';

const { Text, Button } = AllComponents;

const SearchPage = () => {
  return (
    <section className=''>
      <div className='p-2 flex justify-between items-center sticky top-14 xl:static bg-skin-fill'>
        <Text
          styleClasses='text-sm xl:text-lg'
          content='Gift fot your Brother who is 25 years old for his/her Birthday'
        />

        {/* Mobile Filter Button */}

        <Button
          wrapperClasses='xl:hidden'
          styleClasses='!border-0'
          onClick={() => {}}
          icon={{ iconName: 'FilterListAlt' }}
        />
      </div>
      {/* Filter and List */}
      <div className='flex flex-row mt-4'>
        <Filters />

        <div className='flex flex-row flex-wrap px-4 w-full xl:w-4/5'>
          <ProductListing />
        </div>
      </div>
    </section>
  );
};

export default SearchPage;
