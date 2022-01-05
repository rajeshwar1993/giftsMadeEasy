import React from 'react';
import { Button, SectionTitle } from '../../../core/components';
import ListBoxComp from '../../component_overrides/ListBox';
import { DEFAULT_LIST_VALUE } from '../../component_overrides/ListBox/utils';

const SearchTopSection = () => {
  return (
    <>
      <div className='xl:hidden'>
        <SectionTitle
          wrapperClasses='text-center xl:text-left'
          content='Find the perfect gift'
        />
      </div>
      <div className='py-2  flex justify-between xl:justify-end items-center sticky top-[62px] xl:static bg-skin-fill '>
        <div className='flex justify-between items-center xl:items-end w-full xl:w-4/5 xl:px-6'>
          <div className='flex flex-row items-center '>
            {/* <Text content='Filter By:' styleClasses='font-semibold' /> */}
            {/* Mobile Filter Button */}
            <div className='xl:hidden mr-4'>
              <Button
                text='Filters (3)'
                defautStyle='cust-btn-link'
                styleClasses='text-base'
              />
            </div>
            <div className='xl:hidden'>
              <Button
                text='Interests (4)'
                defautStyle='cust-btn-link'
                styleClasses='text-base'
              />
            </div>
            <div className='hidden xl:block'>
              <SectionTitle
                wrapperClasses='text-center xl:text-left !mb-10'
                content='Find the perfect gift'
              />
              <div className='flex items-center'>
                <Button
                  text='Filter By Interests:'
                  defautStyle='cust-btn-link'
                  styleClasses='text-base'
                  wrapperClasses=''
                />
                <span>Electronics</span>
              </div>
            </div>
          </div>
          <div className=''>
            <ListBoxComp
              filterKey={'sort'}
              selectedOption={{
                name: 'Sort by',
                value: DEFAULT_LIST_VALUE
              }}
              onSelected={() => {}}
              options={[]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchTopSection;
