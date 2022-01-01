import React from 'react';
import AllComponents from '../../../core_custom_mixer/components';
import { useRouter } from 'next/router';

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
        <select className='w-full text-xl lg:text-xl border-2 rounded-lg appearance-none'>
          <option value={'rel'}>Relation</option>
        </select>
      </div>
      <div className='my-2 flex items-center w-full'>
        <input
          type='number'
          placeholder='Age'
          className='w-full text-xl lg:text-xl border-2 rounded-lg appearance-none'
        />
      </div>
      <div className='my-2 flex items-center w-full'>
        <select className='w-full text-xl lg:text-xl border-2 rounded-lg appearance-none'>
          <option value={'rel'}>Occassion</option>
        </select>
      </div>
      <Button
        text='GO'
        onClick={() => {
          router.push('/search');
        }}
        wrapperClasses='w-full mt-4'
        styleClasses='w-full'
      />
    </div>
  );
};

export default GiftsSearchMini;
