import React, { FC, useEffect, useState } from 'react';
import { FilterDBKeys } from '../../common/dbKeys';
import { Button, SectionTitle } from '../../components';
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
                onClick={openMobileFilter}
              />
            </div>
            <div className='xl:hidden'>
              <Button
                text='Interests (4)'
                defautStyle='cust-btn-link'
                styleClasses='text-base'
                onClick={() => updateInterestPopeverOpen(true)}
              />
            </div>
            <div className='hidden xl:block'>
              <SectionTitle
                wrapperClasses='text-center xl:text-left !mb-10'
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
