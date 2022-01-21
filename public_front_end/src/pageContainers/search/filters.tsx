import React, { FC, useEffect, useState } from 'react';

import MobileFilters from './mobileFilters';
import {
  createListboxOptions,
  DEFAULT_LIST_VALUE,
  getOptionFromValue
} from '../../components/Reusable/ListBox/utils';
import Filter from '../../models/Filter';
import { Text } from '../../components';
import { FilterDBKeys } from '../../common/dbKeys';
import DataConfig from '../../common/componentConfig';
import ListBoxComp from '../../components/Reusable/ListBox';
import { ListBoxOption } from '../../components/Reusable/ListBox/types';
import CheckBoxGroup from '../../components/Reusable/CheckBoxGroup';
import { Gender } from '../../models/enums';

type Props = {
  filterValues: Filter;
  updateParentState: (key: string, value: string | Array<string>) => void;
  showMobileFilters: boolean;
  applyMobileFilters: () => void;
  onCloseMobileFilters: () => void;
};

const Filters: FC<Props> = ({
  filterValues,
  updateParentState,
  showMobileFilters,
  applyMobileFilters,
  onCloseMobileFilters
}) => {
  const [values, updateValues] = useState(filterValues.convertToJson());

  useEffect(() => {
    updateValues(filterValues.convertToJson());
  }, [filterValues]);

  const updateListValues = (data: ListBoxOption, key: string) => {
    let value = data.value;
    if (value === DEFAULT_LIST_VALUE) {
      value = '';
    }
    updateParentState(key, value);
  };

  const updateCheckboxValues = (key: string, value: Array<string>) => {
    updateParentState(key, value);
  };

  return (
    <>
      <aside className='w-1/5 pr-2 hidden lg:block p-4 '>
        <div className='sticky top-10'>
          <div className='mb-4'>
            <Text content='Filter By:' styleClasses='font-semibold' />
          </div>
          <FilterBody
            values={values}
            updateListValues={updateListValues}
            updateCheckboxValues={updateCheckboxValues}
          />
        </div>
      </aside>

      {/* Mobile Filters */}
      <MobileFilters
        show={showMobileFilters}
        applyMobileFilters={applyMobileFilters}
        onClose={onCloseMobileFilters}
      >
        <FilterBody
          values={values}
          updateListValues={updateListValues}
          updateCheckboxValues={updateCheckboxValues}
        />
      </MobileFilters>
    </>
  );
};

type FilterBodyProp = {
  values: any;
  updateListValues: (data: ListBoxOption, key: string) => void;
  updateCheckboxValues: (key: string, value: Array<string>) => void;
};

const FilterBody: FC<FilterBodyProp> = ({
  values,
  updateListValues,
  updateCheckboxValues
}) => {
  return (
    <div className='flex flex-col w-full'>
      {/* Relationship Filter */}
      <div className='mb-8'>
        <ListBoxComp
          filterKey={FilterDBKeys.relationship}
          title={{ content: 'Relationship' }}
          selectedOption={getOptionFromValue(
            DataConfig.relationship,
            values[FilterDBKeys.relationship],
            'Relationship'
          )}
          onSelected={updateListValues}
          options={createListboxOptions(
            DataConfig.relationship,
            'Relationship'
          )}
        />
      </div>
      {/* Age Filter */}
      <div className='mb-8'>
        <ListBoxComp
          filterKey={FilterDBKeys.ageGrp}
          title={{ content: 'Age Group' }}
          selectedOption={getOptionFromValue(
            DataConfig.ageGrp,
            values[FilterDBKeys.ageGrp],
            'Age Group'
          )}
          onSelected={updateListValues}
          options={createListboxOptions(DataConfig.ageGrp, 'Age Group')}
        />
      </div>
      {/* Rel Filter */}
      <div className='mb-8'>
        <ListBoxComp
          filterKey={FilterDBKeys.occasion}
          title={{ content: 'Occasion' }}
          selectedOption={getOptionFromValue(
            DataConfig.occasion,
            values[FilterDBKeys.occasion],
            'Occasion'
          )}
          onSelected={updateListValues}
          options={createListboxOptions(DataConfig.occasion, 'Occasion')}
        />
      </div>
      {/* Gender Filter */}
      <div className='mb-8'>
        <CheckBoxGroup
          title={{ content: 'Gender' }}
          filterKey={FilterDBKeys.gender}
          checkList={[
            { text: 'Female', value: Gender.Female },
            { text: 'Male', value: Gender.Male }
          ]}
          selected={
            values[FilterDBKeys.gender]
              ? (values[FilterDBKeys.gender] as Array<string>)
              : []
          }
          onChangeHandler={updateCheckboxValues}
        />
      </div>
    </div>
  );
};

export default Filters;
