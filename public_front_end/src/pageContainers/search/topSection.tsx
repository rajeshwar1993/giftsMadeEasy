import React, { FC, useEffect, useMemo, useState } from 'react';
import { FilterDBKeys } from '../../common/dbKeys';
import { Button, SectionTitle, Text } from '../../components';
import ListBoxComp from '../../components/Reusable/ListBox';
import { DEFAULT_LIST_VALUE } from '../../components/Reusable/ListBox/utils';
import SelectInterestsPopup from '../../components/Reusable/SelectInterestsPopup';
import Filter from '../../models/Filter';
import ShowSelectedInterests from './showSelectedInterests';

type Props = {
  filterValues: Filter;
  updateParentState: (key: string, value: string | Array<string>) => void;
  openMobileFilter: () => void;
};

const SearchTopSection: FC<Props> = ({
  filterValues,
  updateParentState,
  openMobileFilter
}) => {
  const [interestPopoverOpen, updateInterestPopeverOpen] = useState(false);

  const [values, updateValues] = useState(filterValues.convertToJson());

  useEffect(() => {
    updateValues(filterValues.convertToJson());
  }, [filterValues]);

  const updateInterestsToParent = (values: Array<string>) => {
    updateParentState(FilterDBKeys.interests, values);
  };

  let filterCount = useMemo(() => {
    let count = 0;
    for (let key in values) {
      if (key !== FilterDBKeys.interests)
        if (Array.isArray(values[key]) && values[key]!.length > 0) {
          count += 1;
        } else if (!Array.isArray(values[key]) && values[key] !== '') {
          count += 1;
        }
    }
    return count;
  }, [values]);

  return (
    <>
      <SectionTitle
        wrapperClasses='text-center lg:hidden'
        content='Find the perfect gift'
        styleClasses=''
      />
      <div className='lg:hidden flex flex-col items-center justify-center space-y-2 px-4 py-4'>
        <div className='flex flex-col'>
          <Text content={'32'} styleClasses='text-6xl font-bold' />
          <Text content={'items found'} styleClasses='text-xs' />
        </div>
        <Button
          text={`clear all filters`}
          defautStyle='cust-btn-link'
          styleClasses='text-sm'
          onClick={() => {}}
        />
      </div>
      <div className='lg:hidden flex justify-between space-x-8 sticky top-[62px] z-10  bg-skin-fill py-4 border-b-2 border-skin-accent border-opacity-70'>
        <Button
          text={`Filters${filterCount ? ` (${filterCount})` : ''}`}
          wrapperClasses='w-full'
          styleClasses='text-base w-full'
          onClick={openMobileFilter}
        />

        <Button
          text={`Interests ${
            values[FilterDBKeys.interests]!.length
              ? ` (${values[FilterDBKeys.interests]!.length})`
              : ''
          }`}
          wrapperClasses='w-full'
          styleClasses='text-base w-full'
          onClick={() => updateInterestPopeverOpen(true)}
        />
      </div>
      <div className='flex justify-between lg:justify-end items-center '>
        <div className='hidden lg:flex justify-between items-center lg:items-end w-full lg:px-6 lg:border-b-2 border-skin-accent border-opacity-70 pb-4'>
          <div className='flex items-start w-full justify-between space-x-16'>
            <div>
              <SectionTitle
                wrapperClasses='lg:text-left !mb-10'
                content='Find the perfect gift'
              />
              <div className='flex flex-col items-start'>
                <Button
                  text={`Filter By Interests${
                    values[FilterDBKeys.interests]!.length
                      ? ` (${values[FilterDBKeys.interests]!.length})`
                      : ''
                  }`}
                  defautStyle='cust-btn-btn'
                  styleClasses='text-base'
                  wrapperClasses=''
                  onClick={() => updateInterestPopeverOpen(true)}
                />
                <div className=' mt-2'>
                  <ShowSelectedInterests
                    values={
                      values[FilterDBKeys.interests]
                        ? (values[FilterDBKeys.interests] as Array<string>)
                        : []
                    }
                    onCancel={updated => {
                      updateInterestsToParent(updated);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className='flex flex-col items-center justify-between space-y-4'>
              <div className='flex flex-col'>
                <Text content={'32'} styleClasses='text-6xl font-bold' />
                <Text content={'items found'} styleClasses='text-xs' />
              </div>
              <Button
                text={`clear all filters`}
                defautStyle='cust-btn-link'
                styleClasses='text-sm'
                onClick={() => {}}
              />
            </div>
          </div>

          {/* TODO maybe we can add sort later */}
          {/* <div className=''>
            <ListBoxComp
              filterKey={'sort'}
              selectedOption={{
                name: 'Sort by',
                value: DEFAULT_LIST_VALUE
              }}
              onSelected={() => {}}
              options={[]}
            />
          </div> */}
        </div>
      </div>
      <SelectInterestsPopup
        open={interestPopoverOpen}
        selectedInts={
          values[FilterDBKeys.interests]
            ? (values[FilterDBKeys.interests] as Array<string>)
            : []
        }
        onSave={updateInterestsToParent}
        onClose={() => updateInterestPopeverOpen(false)}
      />
    </>
  );
};

export default SearchTopSection;
