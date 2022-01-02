import React from 'react';
import ListBoxComp from '../../component_overrides/ListBox';
import AllComponents from '../../../core_custom_mixer/components';
import MobileFilters from './mobileFilters';

const { Button } = AllComponents;

const Filters = () => {
  return (
    <>
      <aside className='w-1/5 pr-2 hidden xl:block p-4 '>
        <div className='flex flex-col sticky top-20'>
          {/* Rel Filter */}
          <div className='mb-8'>
            <ListBoxComp title={{ content: 'Gift For' }} />
          </div>
          {/* Rel Filter */}
          <div className='mb-8'>
            <ListBoxComp />
          </div>
          {/* Rel Filter */}
          <div className='mb-8'>
            <ListBoxComp />
          </div>
          {/* Rel Filter */}
          <div className='mb-8'>
            <ListBoxComp />
          </div>
          {/* Rel Filter */}
          <div className='mb-8'>
            <ListBoxComp />
          </div>
        </div>
      </aside>

      {/* Mobile Filters */}
      <MobileFilters />
    </>
  );
};

export default Filters;
