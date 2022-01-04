import React from 'react';
import AllComponents from '../../../core_custom_mixer/components';
import { useRouter } from 'next/router';
import ListBoxComp from '../../component_overrides/ListBox';
import DataConfig from '../../pageConfigs/dataConfig';
import {
  createListboxOptions,
  DEFAULT_LIST_VALUE
} from '../../component_overrides/ListBox/utils';

let { Text, Button, SectionTitle } = AllComponents;

const GiftsSearchMini = () => {
  const router = useRouter();

  return (
    <div className='flex flex-col justify-center items-start w-full'>
      <SectionTitle content='Quick Search' />

      <div className='my-2'>
        <Text content='I want a gift for' tag='h3' styleClasses='text-lg' />
      </div>
      <div className='my-2 flex items-center w-full'>
        <ListBoxComp
          buttonStyleClasses='text-lg xl:text-xl'
          selectedOption={{ name: 'Relationship', value: DEFAULT_LIST_VALUE }}
          onSelected={() => {}}
          options={createListboxOptions(
            DataConfig.relationship,
            'Relationship'
          )}
        />
      </div>
      <div className='my-2 flex items-center w-full'>
        <ListBoxComp
          buttonStyleClasses='text-lg xl:text-xl'
          selectedOption={{ name: 'Age Group', value: DEFAULT_LIST_VALUE }}
          onSelected={() => {}}
          options={createListboxOptions(DataConfig.ageGrp, 'Age Group')}
        />
      </div>
      <div className='my-2 flex items-center w-full'>
        <ListBoxComp
          buttonStyleClasses='text-lg xl:text-xl'
          selectedOption={{ name: 'Occasion', value: DEFAULT_LIST_VALUE }}
          onSelected={() => {}}
          options={createListboxOptions(DataConfig.occasion, 'Occasion')}
        />
      </div>

      <Button
        text='Search'
        onClick={() => {
          router.push('/search');
        }}
        defautStyle='cust-btn-btn'
        wrapperClasses='w-full m-auto mt-4'
        styleClasses='w-full justify-center !py-2'
      />
    </div>
  );
};

export default GiftsSearchMini;
