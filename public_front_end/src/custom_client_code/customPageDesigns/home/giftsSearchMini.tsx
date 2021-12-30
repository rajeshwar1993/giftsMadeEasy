import React from 'react';
import AllComponents from '../../../core_custom_mixer/components';

let { Text } = AllComponents;

const GiftsSearchMini = () => {
  return (
    <div className='flex flex-col justify-center items-start xl:w-2/3'>
      <Text
        content='I am looking for a gift for'
        tag='h2'
        styleClasses='text-xl xl:text-3xl'
      />
      <div className='mt-2'>
        <Text content='my' tag='span' styleClasses='text-lg xl:text-2xl' />
      </div>
    </div>
  );
};

export default GiftsSearchMini;
