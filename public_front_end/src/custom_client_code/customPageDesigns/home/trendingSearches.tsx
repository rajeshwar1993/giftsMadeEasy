import React from 'react';
import AllComponents from '../../../core_custom_mixer/components';

const { Text } = AllComponents;

const TrendingSearches = () => {
  return (
    <div className='flex flex-col justify-start items-start  xl:items-start p-4'>
      <Text
        content='Trending Searches'
        tag='h3'
        styleClasses='text-lg xl:text-xl font-bold'
        wrapperStyleClasses='mb-4'
      />

      <div className='flex flex-wrap items-center border-2 mb-4 p-2 rounded-lg hover:bg-skin-accent text-skin-primary hover:text-skin-inverted transition-all cursor-pointer'>
        <Text
          content='Gift for my'
          tag='span'
          styleClasses='text-xl xl:text-2xl'
          wrapperStyleClasses='mr-2'
        />
        <Text
          content='Brother'
          tag='span'
          styleClasses='text-2xl xl:text-3xl text-red-500 font-semibold'
          wrapperStyleClasses='mr-2'
        />
        <Text
          content='who is'
          tag='span'
          styleClasses='text-xl xl:text-2xl'
          wrapperStyleClasses='mr-2'
        />
        <Text
          content='32'
          tag='span'
          styleClasses='text-2xl xl:text-3xl text-red-500 font-semibold'
          wrapperStyleClasses='mr-2'
        />
        <Text
          content='years old.'
          tag='span'
          styleClasses='text-xl xl:text-2xl'
          wrapperStyleClasses='mr-2'
        />
      </div>
    </div>
  );
};

export default TrendingSearches;
