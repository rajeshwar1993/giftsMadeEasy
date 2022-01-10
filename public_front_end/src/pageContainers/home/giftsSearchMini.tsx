import React, { useState } from 'react';

import { useRouter } from 'next/router';
import DataConfig from '../../common/componentConfig';
import AppConfig from '../../common/appConfig';

import { FilterDBKeys } from '../../common/dbKeys';
import { Button, SectionTitle } from '../../components';
import {
  createListboxOptions,
  DEFAULT_LIST_VALUE
} from '../../components/Reusable/ListBox/utils';
import { ListBoxOption } from '../../components/Reusable/ListBox/types';
import ListBoxComp from '../../components/Reusable/ListBox';

const GiftsSearchMini = () => {
  const router = useRouter();

  const [searchParams, updateSearchParams] = useState({
    [FilterDBKeys.relationship]: {
      name: AppConfig.COMMON.relationshipLabel,
      value: DEFAULT_LIST_VALUE
    },
    [FilterDBKeys.ageGrp]: {
      name: AppConfig.COMMON.ageGroupLabel,
      value: DEFAULT_LIST_VALUE
    },
    [FilterDBKeys.occasion]: {
      name: AppConfig.COMMON.occasionLabel,
      value: DEFAULT_LIST_VALUE
    }
  });

  const handleListboxOnChange = (data: ListBoxOption, key: string) => {
    updateSearchParams(state => ({
      ...state,
      [key]: data
    }));
  };

  return (
    <div className='flex flex-col justify-center items-start w-full'>
      <SectionTitle content={'Quick Search'} />

      <div className='my-2 flex items-center w-full'>
        <ListBoxComp
          filterKey={FilterDBKeys.relationship}
          buttonStyleClasses='text-lg xl:text-xl'
          selectedOption={searchParams[FilterDBKeys.relationship]}
          onSelected={handleListboxOnChange}
          options={createListboxOptions(
            DataConfig.relationship,
            AppConfig.COMMON.relationshipLabel
          )}
        />
      </div>
      <div className='my-2 flex items-center w-full'>
        <ListBoxComp
          filterKey={FilterDBKeys.ageGrp}
          buttonStyleClasses='text-lg xl:text-xl'
          selectedOption={searchParams[FilterDBKeys.ageGrp]}
          onSelected={handleListboxOnChange}
          options={createListboxOptions(
            DataConfig.ageGrp,
            AppConfig.COMMON.ageGroupLabel
          )}
        />
      </div>
      <div className='my-2 flex items-center w-full'>
        <ListBoxComp
          filterKey={FilterDBKeys.occasion}
          buttonStyleClasses='text-lg xl:text-xl'
          selectedOption={searchParams[FilterDBKeys.occasion]}
          onSelected={handleListboxOnChange}
          options={createListboxOptions(
            DataConfig.occasion,
            AppConfig.COMMON.occasionLabel
          )}
        />
      </div>

      <Button
        text={'Search'}
        onClick={() => {
          router.push({
            pathname: '/search',
            query: {
              [FilterDBKeys.relationship]:
                searchParams[FilterDBKeys.relationship].value,
              [FilterDBKeys.occasion]:
                searchParams[FilterDBKeys.occasion].value,
              [FilterDBKeys.ageGrp]: searchParams[FilterDBKeys.ageGrp].value
            }
          });
        }}
        defautStyle='cust-btn-btn'
        wrapperClasses='w-full m-auto mt-4'
        styleClasses='w-full justify-center !py-2'
      />
    </div>
  );
};

export default GiftsSearchMini;
