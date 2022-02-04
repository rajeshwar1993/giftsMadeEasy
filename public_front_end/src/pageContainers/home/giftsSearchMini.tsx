import React, { useState } from 'react';

import { useRouter } from 'next/router';
import AppConfig from '../../common/appConfig';

import { FilterDBKeys } from '../../common/dbKeys';
import { Button, SectionTitle, Text } from '../../components';
import {
  createListboxOptions,
  DEFAULT_LIST_VALUE
} from '../../components/Reusable/ListBox/utils';
import { ListBoxOption } from '../../components/Reusable/ListBox/types';
import ListBoxComp from '../../components/Reusable/ListBox';
import {
  ageGrpFilterValues,
  relationshipFilterValues
} from '../../common/staticFilterValues';
import { logSearchQuery } from '../../common/analyticsEvents';

const GiftsSearchMini = () => {
  const router = useRouter();

  const [searchParams, updateSearchParams] = useState({
    [FilterDBKeys.relationship]: {
      text: AppConfig.COMMON.relationshipLabel,
      value: DEFAULT_LIST_VALUE
    },
    [FilterDBKeys.ageGrp]: {
      text: AppConfig.COMMON.ageGroupLabel,
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
    <div
      className='flex flex-col justify-center items-start w-full'
      data-testid='quickSearchContainer'
    >
      <SectionTitle
        content={AppConfig.COMPONENTS.giftSearchMini.title}
        tag='span'
      />
      <Text content={AppConfig.COMPONENTS.giftSearchMini.subtitle} />
      <div className='my-2 flex items-center w-full'>
        <ListBoxComp
          dataTestId='relFilterMini'
          filterKey={FilterDBKeys.relationship}
          buttonStyleClasses='text-lg xl:text-xl'
          selectedOption={searchParams[FilterDBKeys.relationship]}
          onSelected={handleListboxOnChange}
          options={createListboxOptions(
            relationshipFilterValues,
            AppConfig.COMMON.relationshipLabel
          )}
        />
      </div>
      <div className='my-2 flex items-center w-full'>
        <ListBoxComp
          dataTestId='ageFilterMini'
          filterKey={FilterDBKeys.ageGrp}
          buttonStyleClasses='text-lg xl:text-xl'
          selectedOption={searchParams[FilterDBKeys.ageGrp]}
          onSelected={handleListboxOnChange}
          options={createListboxOptions(
            ageGrpFilterValues,
            AppConfig.COMMON.ageGroupLabel
          )}
        />
      </div>

      <Button
        text={AppConfig.COMPONENTS.giftSearchMini.searchLabel}
        onClick={() => {
          const query = {
            [FilterDBKeys.relationship]:
              searchParams[FilterDBKeys.relationship].value,
            [FilterDBKeys.ageGrp]: searchParams[FilterDBKeys.ageGrp].value
          };
          router.push({
            pathname: '/search',
            query
          });

          logSearchQuery({ source: 'quick_search', search_query: query });
        }}
        defautStyle='cust-btn-btn'
        wrapperClasses='w-full m-auto mt-4'
        styleClasses='w-full justify-center !py-2'
      />
    </div>
  );
};

export default GiftsSearchMini;
