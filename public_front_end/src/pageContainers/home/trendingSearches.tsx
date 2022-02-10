import React, { FC } from 'react';
import { SectionTitle, Text } from '../../components';

const TrendingSearches = () => {
  return (
    <div className=''>
      <SectionTitle content='Trending Searches' />

      <div className='mt-4 w-full grid grid-cols-2 xl:grid-cols-4 grid-flow-row gap-4 xl:gap-6'>
        <TrendingSearchBox
          text='A Birthday gift for my Daughter'
          styleClass='col-span-2'
          fontSizeClass='text-xl xl:text-3xl'
        />
        <TrendingSearchBox text='A Special gift for my Father on his Retirement.' />
        <TrendingSearchBox
          text='Something fancy for my Mother who loves pottery.'
          styleClass='row-span-2'
          fontSizeClass='text-xl xl:text-3xl'
        />
        <TrendingSearchBox text='A cute gift for my Girlfriend who loves to paint.' />

        <TrendingSearchBox
          text='A classy gift for my Colleague who is a sports enthusiast.'
          styleClass='row-span-2 col-span-2'
          fontSizeClass='text-3xl xl:text-6xl'
        />
      </div>
    </div>
  );
};

type SearchBoxType = {
  text: string;
  styleClass?: string;
  fontSizeClass?: string;
  count?: number;
};

const TrendingSearchBox: FC<SearchBoxType> = ({
  text,
  styleClass,
  fontSizeClass = 'text-xl xl:text-3xl',
  count = 30
}) => {
  return (
    <div
      className={`relative bg-skin-inverted bg-opacity-5 hover:text-skin-inverted hover:bg-opacity-100 text-skin-primary flex justify-center items-center p-2 rounded-lg transition-all duration-200 cursor-pointer overflow-hidden text-center ${styleClass} ${fontSizeClass}`}
    >
      {text}
    </div>
  );
};

export default TrendingSearches;
