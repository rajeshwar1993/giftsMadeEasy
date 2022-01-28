import React from 'react';
import { Text } from '../../components';

import GiftsSearchMini from './giftsSearchMini';
import TrendingSearches from './trendingSearches';

const HomePage = () => {
  return (
    <section className='text-base flex flex-col space-y-8'>
      <div className='flex flex-col justify-start items-center space-y-8 md:flex-row md:items-center md:space-x-12 md:space-y-0'>
        {/* Banner Text */}
        <div className='w-full md:w-2/3 xl:w-3/4 md:mt-0 flex flex-col items-start'>
          <Text
            tag='h1'
            content='give gifts that matter'
            styleClasses='text-7xl md:text-8xl xl:text-9xl font-extrabold'
          />
          <Text
            content='and this is where you find them'
            styleClasses='text-xl md:text-2xl xl:text-5xl font-bold'
          />
        </div>
        {/* Gifts Search Mini Section */}
        <div className='w-full md:w-1/3 xl:w-1/4'>
          <GiftsSearchMini />
        </div>
      </div>
      <div>
        <TrendingSearches />
      </div>
    </section>
  );
};

export default HomePage;
