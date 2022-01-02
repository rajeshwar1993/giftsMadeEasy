import React from 'react';
import AllComponents from '../../../core_custom_mixer/components';
import GiftsSearchMini from './giftsSearchMini';
import TrendingSearches from './trendingSearches';

const { Text } = AllComponents;

const HomePage = () => {
  return (
    <section className='text-base'>
      <div className=' flex flex-col-reverse justify-start items-center flex-wrap xl:flex-row xl:items-start'>
        {/* Gifts Search Mini Section */}
        <div className='w-full xl:w-2/6 xl:pr-8'>
          <GiftsSearchMini />
        </div>
        {/* Banner Text */}
        <div className='w-full xl:w-4/6 mb-6 xl:mt-0 flex xl:justify-center items-center'>
          <div>
            <Text content='YOUR' styleClasses='text-4xl xl:text-6xl' />
            <Text
              content='PRESENT'
              styleClasses='text-6xl xl:text-9xl'
              tag='h1'
            />
            <Text content='THAT MATTERS' styleClasses='text-4xl xl:text-7xl' />
          </div>
        </div>
      </div>
      <div className='mt-12'>
        <TrendingSearches />
      </div>
    </section>
  );
};

export default HomePage;
