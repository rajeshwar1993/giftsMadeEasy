import React from 'react';
import AllComponents from '../../../core_custom_mixer/components';
import { useRouter } from 'next/router';

let { Text, Button } = AllComponents;

const GiftsSearchMini = () => {
  const router = useRouter();

  return (
    <div className='flex flex-col justify-center items-start p-4 w-full shadow-2xl rounded-xl bg-skin-accent bg-opacity-20'>
      <Text
        content='Quick Search'
        tag='h3'
        styleClasses='text-3xl font-light'
        wrapperStyleClasses='mb-2'
      />
      <Text
        content='A gift for'
        tag='h3'
        styleClasses='text-lg'
        wrapperStyleClasses='my-2 '
      />
      <div className='my-2 flex items-center w-full'>
        {/* <Text content='my' tag='span' styleClasses='mr-4 text-xl xl:text-3xl' /> */}
        <select className='w-full text-xl lg:text-xl border-2 rounded-lg appearance-none'>
          <option value={'rel'}>Relation</option>
        </select>
      </div>
      <div className='my-2 flex items-center w-full'>
        {/* <Text
          content='who is'
          tag='span'
          styleClasses='mr-4 text-xl xl:text-3xl'
        /> */}
        <input
          type='number'
          placeholder='Age'
          className='w-full text-xl lg:text-xl border-2 rounded-lg appearance-none'
        />
        {/* <Text
          content='years old'
          tag='span'
          styleClasses='ml-4 text-xl xl:text-3xl'
        /> */}
      </div>
      <div className='my-2 flex items-center w-full'>
        {/* <Text
          content='for'
          tag='span'
          styleClasses='mr-4 text-xl xl:text-3xl'
        /> */}
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
