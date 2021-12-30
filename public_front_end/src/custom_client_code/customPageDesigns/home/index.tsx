import React from 'react';
import AllComponents from '../../../core_custom_mixer/components';
import GiftsSearchMini from './giftsSearchMini';
import TrendingSearches from './trendingSearches';

const { BannerImage, Text } = AllComponents;

const HomePage = () => {
  return (
    <section className='text-base'>
      {/* Banner section */}
      <BannerImage
        image={{ src: '/images/banner_1.jpg', alt: 'Banner Image' }}
      />
      <div className='mt-8 flex flex-col justify-start items-center flex-wrap xl:flex-row xl:items-start'>
        {/* Gifts Search Mini Section */}
        <div className='w-full xl:w-2/5 xl:pr-8'>
          <GiftsSearchMini />
        </div>
        {/* Popular searches */}
        <div className='mt-6 xl:mt-0'>
          <TrendingSearches />
        </div>
      </div>
      <div className=''>
        <Text
          content='Popular Gifts'
          tag='h2'
          styleClasses='text-xl xl:text-3xl'
        />
      </div>
    </section>
  );
};

export default HomePage;
