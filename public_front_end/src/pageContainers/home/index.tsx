import React from 'react';
import { Text } from '../../components';

import GiftsSearchMini from './giftsSearchMini';
import TrendingSearches from './trendingSearches';

const HomePage = () => {
  return (
    <section className='text-base'>
      <div className=' flex flex-col-reverse justify-start items-center flex-wrap md:flex-row md:items-start'>
        {/* Gifts Search Mini Section */}
        <div className='w-full md:w-2/6 md:pr-8'>
          <GiftsSearchMini />
        </div>
        {/* Banner Text */}
        <div className='w-full md:w-4/6 mb-6 md:mt-0 flex flex-col  items-start'>
          <Text content='YOUR' styleClasses='text-4xl md:text-6xl' />
          <Text
            content='PRESENT'
            styleClasses='text-6xl md:text-8xl lg:text-9xl'
            tag='h1'
          />
          <Text content='THAT MATTERS' styleClasses='text-4xl md:text-7xl' />
        </div>
      </div>
      <div className='mt-12'>
        <TrendingSearches />
      </div>
    </section>
  );
};

export default HomePage;
