import React, { FC, useEffect, useState } from 'react';
import ListBoxComp from '../../component_overrides/ListBox';

import MobileFilters from './mobileFilters';
import {
  createListboxOptions,
  DEFAULT_LIST_VALUE,
  getOptionFromValue
} from '../../component_overrides/ListBox/utils';
import DataConfig from '../../pageConfigs/dataConfig';
import { FilterDBKeys } from '../../../helpers/dbKeys';
import Filter from '../../../models/Filter';
import { Text } from '../../../core/components';

type Props = {
  filterValues: Filter;
};

const Filters: FC<Props> = ({ filterValues }) => {
  const [values, updateValues] = useState(filterValues.convertToJson());

  useEffect(() => {
    updateValues(filterValues.convertToJson());
  }, [filterValues]);

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
              filterKey={FilterDBKeys.relationship}
              title={{ content: 'Relationship' }}
              selectedOption={getOptionFromValue(
                DataConfig.relationship,
                values[FilterDBKeys.relationship],
                'Relationship'
              )}
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
              filterKey={FilterDBKeys.ageGrp}
              title={{ content: 'Age Group' }}
              selectedOption={getOptionFromValue(
                DataConfig.ageGrp,
                values[FilterDBKeys.ageGrp],
                'Age Group'
              )}
              onSelected={() => {}}
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
