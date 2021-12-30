import React from 'react';
import AllComponents from '../../../core_custom_mixer/components';
import GiftsSearchMini from './giftsSearchMini';

let { BannerImage, Text } = AllComponents;

const HomePage = () => {
  return (
    <section className='text-base'>
      {/* Banner section */}
      <BannerImage
        image={{ src: '/images/banner_1.jpg', alt: 'Banner Image' }}
      />
      <div className='px-4 mt-8 flex flex-col xl:flex-row'>
        {/* Gifts Search Mini Section */}
        <GiftsSearchMini />
        {/* Popular searches */}
        <div className='flex flex-col justify-center items-start'>
          <Text
            content='Trending Searches'
            tag='h2'
            styleClasses='text-xl xl:text-3xl'
          />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
