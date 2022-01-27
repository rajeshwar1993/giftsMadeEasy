import React, { FC, useEffect, useMemo, useState } from 'react';
import { FilterDBKeys } from '../../common/dbKeys';
import { Button, SectionTitle, Text } from '../../components';
import CountUp from 'react-countup';
import SelectInterestsPopup from '../../components/Reusable/SelectInterestsPopup';
import Filter from '../../models/Filter';
import ShowSelectedInterests from './showSelectedInterests';

type Props = {
  filterValues: Filter;
  updateParentState: (key: string, value: string | Array<string>) => void;
  openMobileFilter: () => void;
  handleClearFilters: () => void;
  resultCount: number;
};

const SearchTopSection: FC<Props> = ({
  filterValues,
  updateParentState,
  openMobileFilter,
  handleClearFilters,
  resultCount
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
          <CountUp
            start={0}
            end={resultCount}
            duration={1.7}
            delay={0}
            useEasing={true}
          >
            {({ countUpRef }) => (
              <div>
                <span ref={countUpRef} className='text-6xl font-bold' />
              </div>
            )}
          </CountUp>
          <Text content={'items found'} styleClasses='text-xs' />
        </div>
        <Button
          text={`clear all filters`}
          defautStyle='cust-btn-link'
          styleClasses='text-sm'
          onClick={handleClearFilters}
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
        <div className='hidden lg:flex justify-between items-center lg:items-end w-full lg:px-6 lg:border-b-2 border-skin-primary pb-4'>
          <div className='flex w-full justify-between items-center space-x-16'>
            <div className='lg:w-5/6 xl:w-11/12'>
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
            <div className='flex flex-col items-center justify-between space-y-4 lg:w-1/6 xl:w-1/12'>
              <div className='flex flex-col items-center'>
                <CountUp
                  start={0}
                  end={resultCount}
                  duration={1.7}
                  delay={0}
                  useEasing={true}
                >
                  {({ countUpRef }) => (
                    <div>
                      <span
                        ref={countUpRef}
                        className='lg:text-7xl xl:text-8xl font-bold'
                      />
                    </div>
                  )}
                </CountUp>

                <Text content={'items found'} styleClasses='text-xs' />
              </div>
              <Button
                text={`clear all filters`}
                defautStyle='cust-btn-link'
                styleClasses='text-sm'
                onClick={handleClearFilters}
              />
            </div>
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
