import React from 'react';
import AllComponents from '../../../core_custom_mixer/components';

let { Text, Button } = AllComponents;

const GiftsSearchMini = () => {
  return (
    <div className='flex flex-col justify-center items-start border-2 p-4 rounded-lg'>
      <Text
        content='Quick Search: '
        tag='h2'
        styleClasses='text-2xl xl:text-3xl'
        wrapperStyleClasses='mb-4'
      />
      <Text
        content='I am looking for a gift for'
        tag='h3'
        styleClasses='text-2xl xl:text-3xl'
        wrapperStyleClasses='my-2 '
      />
      <div className='my-2 flex items-center'>
        <Text content='my' tag='span' styleClasses='mr-4 text-xl xl:text-3xl' />
        <select className='w-60 text-xl lg:text-xl border-2 rounded-lg appearance-none'>
          <option value={'rel'}>Relative</option>
        </select>
      </div>
      <div className='my-2 flex items-center'>
        <Text
          content='who is'
          tag='span'
          styleClasses='mr-4 text-xl xl:text-3xl'
        />
        <input
          type='number'
          className='w-36 text-xl lg:text-xl border-2 rounded-lg appearance-none text-center'
        />
        <Text
          content='years old'
          tag='span'
          styleClasses='ml-4 text-xl xl:text-3xl'
        />
      </div>
      <div className='my-2 flex items-center'>
        <Text
          content='for'
          tag='span'
          styleClasses='mr-4 text-xl xl:text-3xl'
        />
        <select className='w-60 text-xl lg:text-xl border-2 rounded-lg appearance-none'>
          <option value={'rel'}>Birthday</option>
        </select>
      </div>
      <Button
        text='GO'
        onClick={() => {}}
        wrapperClasses='w-full mt-4'
        styleClasses='w-full'
      />
    </div>
  );
};

export default GiftsSearchMini;
