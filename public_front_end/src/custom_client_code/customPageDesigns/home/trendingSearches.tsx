import React, { FC } from 'react';
import AllComponents from '../../../core_custom_mixer/components';

const { Text, SectionTitle } = AllComponents;

const TrendingSearches = () => {
  return (
    <div className='flex flex-col justify-start items-start xl:items-start'>
      <SectionTitle content='Trending Searches' />

      <div className='mt-4 w-full grid grid-cols-2 xl:grid-cols-4 grid-flow-row gap-4 xl:gap-10'>
        <TreandingSearchBox
          rel='Brother'
          age='32'
          oc='Birthday'
          styleClass='bg-teal-800 col-span-2'
        />
        <TreandingSearchBox
          rel='Brother'
          age='32'
          oc='Birthday'
          styleClass='bg-red-800'
        />
        <TreandingSearchBox
          rel='Brother'
          age='32'
          oc='Birthday'
          styleClass='bg-blue-800 row-span-2'
        />
        <TreandingSearchBox
          rel='Brother'
          age='32'
          oc='Birthday'
          styleClass='bg-yellow-800'
        />
        <TreandingSearchBox
          rel='Brother'
          age='32'
          oc='Birthday'
          styleClass='bg-green-800'
        />
        <TreandingSearchBox
          rel='Brother'
          age='32'
          oc='Birthday'
          styleClass='bg-indigo-800'
        />
        <TreandingSearchBox
          rel='Brother'
          age='32'
          oc='Birthday'
          styleClass='bg-rose-800 row-span-2 col-span-2'
        />
        <TreandingSearchBox
          rel='Brother'
          age='32'
          oc='Birthday'
          styleClass='bg-teal-800'
        />
        <TreandingSearchBox
          rel='Brother'
          age='32'
          oc='Birthday'
          styleClass='bg-purple-800'
        />
        <TreandingSearchBox
          rel='Brother'
          age='32'
          oc='Birthday'
          styleClass='bg-teal-800'
        />
        <TreandingSearchBox
          rel='Brother'
          age='32'
          oc='Birthday'
          styleClass='bg-cyan-800'
        />
      </div>
    </div>
  );
};

type SearchBoxType = {
  rel: string;
  age?: string;
  oc?: string;
  styleClass?: string;
};

const TreandingSearchBox: FC<SearchBoxType> = ({
  rel,
  age,
  oc,
  styleClass
}) => {
  return (
    <div
      className={`text-lg bg-opacity-30 hover:bg-opacity-80 hover:text-skin-inverted xl:text-2xl text-skin-primary flex justify-center items-center p-2 rounded-lg transition-all cursor-pointer ${styleClass}`}
    >
      <div className=''>
        <Text content='Gift for my ' tag='span' styleClasses='' />
        <Text
          content={oc ? `${rel}'s ` : ''}
          tag='span'
          styleClasses=' font-bold'
        />
        {oc && <Text content={`${oc} `} tag='span' styleClasses=' font-bold' />}
        {age && (
          <>
            <Text content='who is ' tag='span' styleClasses='' />
            <Text content={age} tag='span' styleClasses=' font-bold' />
            <Text content=' years old.' tag='span' styleClasses='' />
          </>
        )}
      </div>
    </div>
  );
};

export default TrendingSearches;
