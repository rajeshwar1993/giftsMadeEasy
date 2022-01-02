import React, { FC } from 'react';
import AllComponents from '../../../core_custom_mixer/components';
import Badge from '../../component_overrides/Bagde';

const { Text, SectionTitle } = AllComponents;

const TrendingSearches = () => {
  return (
    <div className=''>
      <SectionTitle content='Trending Searches' />

      <div className='mt-4 w-full grid grid-cols-2 xl:grid-cols-4 grid-flow-row gap-4 xl:gap-6'>
        <TreandingSearchBox
          rel='Brother'
          age='32'
          oc='Birthday'
          styleClass='col-span-2'
          fontSizeClass='text-2xl xl:text-5xl'
        />
        <TreandingSearchBox rel='Brother' age='32' oc='Birthday' />
        <TreandingSearchBox
          rel='Brother'
          age='32'
          oc='Birthday'
          styleClass='row-span-2'
          fontSizeClass='text-2xl xl:text-5xl'
        />
        <TreandingSearchBox rel='Brother' age='32' oc='Birthday' />
        <TreandingSearchBox rel='Brother' age='32' oc='Birthday' />
        <TreandingSearchBox rel='Brother' age='32' oc='Birthday' />
        <TreandingSearchBox
          rel='Brother'
          age='32'
          oc='Birthday'
          styleClass='row-span-2 col-span-2'
          fontSizeClass='text-5xl xl:text-8xl'
        />
        <TreandingSearchBox rel='Brother' age='32' oc='Birthday' />
        <TreandingSearchBox rel='Brother' age='32' oc='Birthday' />
        <TreandingSearchBox rel='Brother' age='32' oc='Birthday' />
        <TreandingSearchBox rel='Brother' age='32' oc='Birthday' />
      </div>
    </div>
  );
};

type SearchBoxType = {
  rel?: string;
  age?: string;
  oc?: string;
  styleClass?: string;
  fontSizeClass?: string;
  count?: number;
};

const TreandingSearchBox: FC<SearchBoxType> = ({
  rel,
  age,
  oc,
  styleClass,
  fontSizeClass = 'text-xl xl:text-3xl',
  count = 30
}) => {
  return (
    <div
      className={`relative bg-skin-accent bg-opacity-5 hover:text-skin-inverted hover:bg-opacity-100 text-skin-primary flex justify-center items-center p-2 rounded-lg transition-all duration-200 cursor-pointer overflow-hidden ${styleClass} ${fontSizeClass}`}
    >
      <div className=''>
        {rel && (
          <Text content={` ${rel} `} tag='span' styleClasses=' font-semibold' />
        )}
        {age && (
          <>
            <Text content={` ${age} `} tag='span' styleClasses=' font-light' />
          </>
        )}
        {oc && (
          <Text content={` ${oc} `} tag='span' styleClasses=' font-semibold' />
        )}
      </div>
    </div>
  );
};

export default TrendingSearches;
