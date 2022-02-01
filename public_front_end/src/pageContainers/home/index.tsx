import React, { FC } from 'react';
import { Text } from '../../components';
import GiftsSearchMini from './giftsSearchMini';
import ProductShowcase from './productShowcase';
import TrendingSearches from './trendingSearches';
import { HomePageData } from '../../pages';

const HomePage: FC<HomePageData> = ({ headLines, productShowcase }) => {
  return (
    <div className='text-base flex flex-col space-y-16'>
      <article className='flex flex-col justify-start items-center space-y-8 md:flex-row md:items-center md:space-x-12 md:space-y-0'>
        {/* Banner Text */}
        <div className='w-full md:w-2/3 xl:w-3/4 md:mt-0 flex flex-col items-start'>
          <Text
            tag='h1'
            content={headLines.header}
            styleClasses='text-7xl md:text-8xl xl:text-9xl font-extrabold'
          />
          <Text
            content={headLines.subheader}
            styleClasses='text-xl md:text-2xl xl:text-5xl font-bold'
          />
        </div>
        {/* Gifts Search Mini Section */}
        <div className='w-full md:w-1/3 xl:w-1/4'>
          <GiftsSearchMini />
        </div>
      </article>
      <div className='mx-auto max-w-7xl'>
        <Text
          tag='h2'
          content={headLines.aboutLine}
          styleClasses='text-xl md:text-2xl xl:text-3xl text-center'
        />
      </div>

      {productShowcase.map((show, i) => {
        return (
          <ProductShowcase
            key={i}
            title={show.title}
            seeAllLink={show.seeAllLink}
            products={show.products}
            seeAllTitle={show.seeAllTitle}
          />
        );
      })}

      <div>
        <TrendingSearches />
      </div>
    </div>
  );
};

export default HomePage;
