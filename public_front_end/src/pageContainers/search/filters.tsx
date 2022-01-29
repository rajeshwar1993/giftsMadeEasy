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
import { Festivals, Gender } from '../../models/enums';
import {
  ageGrpFilterValues,
  festivalilterValues,
  occasionFilterValues,
  relationshipFilterValues
} from '../../common/staticFilterValues';
import AppConfig from '../../common/appConfig';

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
        <div className='sticky top-16'>
          <div className='mb-4'>
            <Text
              content={AppConfig.SEARCH.filterByLabel}
              styleClasses='font-semibold'
            />
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
          title={{ content: AppConfig.COMMON.relationshipLabel }}
          selectedOption={getOptionFromValue(
            relationshipFilterValues,
            values[FilterDBKeys.relationship],
            AppConfig.COMMON.relationshipLabel
          )}
          onSelected={updateListValues}
          options={createListboxOptions(
            relationshipFilterValues,
            AppConfig.COMMON.relationshipLabel
          )}
        />
      </div>
      {/* Age Filter */}
      <div className='mb-8'>
        <ListBoxComp
          filterKey={FilterDBKeys.ageGrp}
          title={{ content: AppConfig.COMMON.ageGroupLabel }}
          selectedOption={getOptionFromValue(
            ageGrpFilterValues,
            values[FilterDBKeys.ageGrp],
            AppConfig.COMMON.ageGroupLabel
          )}
          onSelected={updateListValues}
          options={createListboxOptions(
            ageGrpFilterValues,
            AppConfig.COMMON.ageGroupLabel
          )}
        />
      </div>
      {/* Upcomming festivals Filter */}
      <div className='mb-8'>
        <CheckBoxGroup
          title={{ content: AppConfig.SEARCH.upcommingFestivalsLabel }}
          filterKey={FilterDBKeys.festivals}
          checkList={[
            {
              text: festivalilterValues.get(Festivals.ValentinesDay)!,
              value: Festivals.ValentinesDay
            },
            {
              text: festivalilterValues.get(Festivals.Holi)!,
              value: Festivals.Holi
            }
          ]}
          selected={
            values[FilterDBKeys.festivals]
              ? (values[FilterDBKeys.festivals] as Array<string>)
              : []
          }
          onChangeHandler={updateCheckboxValues}
        />
      </div>
      {/* Occasion Filter */}
      <div className='mb-8'>
        <ListBoxComp
          filterKey={FilterDBKeys.occasion}
          title={{ content: AppConfig.COMMON.occasionLabel }}
          selectedOption={getOptionFromValue(
            occasionFilterValues,
            values[FilterDBKeys.occasion],
            AppConfig.COMMON.occasionLabel
          )}
          onSelected={updateListValues}
          options={createListboxOptions(
            occasionFilterValues,
            AppConfig.COMMON.occasionLabel
          )}
        />
      </div>
      {/* Gender Filter */}
      <div className='mb-8'>
        <CheckBoxGroup
          title={{ content: AppConfig.COMMON.genderLabel }}
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
