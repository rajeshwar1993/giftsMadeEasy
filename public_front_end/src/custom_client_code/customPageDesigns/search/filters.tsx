import React from 'react';
import ListBoxComp from '../../component_overrides/ListBox';
import AllComponents from '../../../core_custom_mixer/components';
import MobileFilters from './mobileFilters';
import {
  createListboxOptions,
  DEFAULT_LIST_VALUE
} from '../../component_overrides/ListBox/utils';
import DataConfig from '../../pageConfigs/dataConfig';

const { Button, Text } = AllComponents;

const Filters = () => {
  return (
    <>
      <aside className='w-1/5 pr-2 hidden xl:block p-4 '>
        <div className='flex flex-col sticky top-[88px]'>
          <div className='mb-4'>
            <Text content='Filter By:' styleClasses='font-semibold' />
          </div>
          {/* Relationship Filter */}
          <div className='mb-8'>
            <ListBoxComp
              title={{ content: 'Relationship' }}
              selectedOption={{
                name: 'Relationship',
                value: DEFAULT_LIST_VALUE
              }}
              onSelected={() => {}}
              options={createListboxOptions(
                DataConfig.relationship,
                'Relationship'
              )}
            />
          </div>
          {/* Age Filter */}
          <div className='mb-8'>
            <ListBoxComp
              title={{ content: 'Age Group' }}
              selectedOption={{ name: 'Age Group', value: DEFAULT_LIST_VALUE }}
              onSelected={() => {}}
              options={createListboxOptions(DataConfig.ageGrp, 'Age Group')}
            />
          </div>
          {/* Rel Filter */}
          <div className='mb-8'>
            <ListBoxComp
              title={{ content: 'Occasion' }}
              selectedOption={{ name: 'Occasion', value: DEFAULT_LIST_VALUE }}
              onSelected={() => {}}
              options={createListboxOptions(DataConfig.occasion, 'Occasion')}
            />
          </div>
        </div>
      </aside>

      {/* Mobile Filters */}
      <MobileFilters />
    </>
  );
};

export default Filters;
