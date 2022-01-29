import React, { useEffect, useState } from 'react';
import { Text } from '../../components';
import { ProductListItemType } from '../../components/Reusable/ProductListItem/type';

import GiftsSearchMini from './giftsSearchMini';
import ProductShowcase from './productShowcase';
import TrendingSearches from './trendingSearches';
import makeSearch from '../../common/algolia';
import AppConfig from '../../common/appConfig';

const HomePage = () => {
  const [showcaseResults, setShowCaseResults] = useState<{
    [key: number]: Array<ProductListItemType>;
  }>({});

  const fetchAllShowcaseResults = async (showCaseList: Array<any>) => {
    try {
      let promises: any = [];

      showCaseList.forEach(s => {
        promises.push(makeSearch(s.queryParams, { hitsPerPage: 6 }));
      });

      let res = await Promise.allSettled(promises);

      res.forEach((r: any, i) => {
        if (r && r.status === 'fulfilled') {
          const hits = r.value.hits as Array<ProductListItemType>;
          setShowCaseResults(state => {
            return {
              ...state,
              [i]: hits
            };
          });
        }
      });
    } catch (e) {
      // TODO handle error
      console.log(e);
    }
  };

  useEffect(() => {
    fetchAllShowcaseResults(AppConfig.HOME.showcase);
  }, []);

  return (
    <section className='text-base flex flex-col space-y-16'>
      <div className='flex flex-col justify-start items-center space-y-8 md:flex-row md:items-center md:space-x-12 md:space-y-0'>
        {/* Banner Text */}
        <div className='w-full md:w-2/3 xl:w-3/4 md:mt-0 flex flex-col items-start'>
          <Text
            tag='h1'
            content={AppConfig.HOME.hL1}
            styleClasses='text-7xl md:text-8xl xl:text-9xl font-extrabold'
          />
          <Text
            content={AppConfig.HOME.hL1}
            styleClasses='text-xl md:text-2xl xl:text-5xl font-bold'
          />
        </div>
        {/* Gifts Search Mini Section */}
        <div className='w-full md:w-1/3 xl:w-1/4'>
          <GiftsSearchMini />
        </div>
      </div>
      <div className='mx-auto max-w-7xl'>
        <Text
          tag='h2'
          content={AppConfig.HOME.aboutLine}
          styleClasses='text-xl md:text-2xl xl:text-3xl text-center'
        />
      </div>

      {AppConfig.HOME.showcase.map((show, i) => {
        return (
          <ProductShowcase
            key={i}
            title={show.title}
            seeAllLink={show.seeAllLink}
            products={showcaseResults[i]}
            seeAllTitle={show.seeAllTitle}
          />
        );
      })}

      <div>
        <TrendingSearches />
      </div>
    </section>
  );
};

export default HomePage;
