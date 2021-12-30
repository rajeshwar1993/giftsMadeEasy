import React from 'react';
import ListBoxComp from '../../component_overrides/ListBox';

const Filters = () => {
  return (
    <aside className='p-4 border-2 rounded-lg'>
      <div className='flex flex-col'>
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
        {/* Rel Filter */}
        <div className='mb-8'>
          <ListBoxComp />
        </div>
      </div>
    </aside>
  );
};

export default Filters;
