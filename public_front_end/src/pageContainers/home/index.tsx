import React, { useEffect, useState } from 'react';
import { Text } from '../../components';
import { ProductListItemType } from '../../components/Reusable/ProductListItem/type';

import GiftsSearchMini from './giftsSearchMini';
import ProductShowcase from './productShowcase';
import TrendingSearches from './trendingSearches';
import makeSearch from '../../common/algolia';
import { FilterDBKeys } from '../../common/dbKeys';
import {
  occasionFilterValues,
  relationshipFilterValues
} from '../../common/staticFilterValues';

const HomePage = () => {
  const [showcaseResults, setShowCaseResults] = useState<{
    0: Array<ProductListItemType>;
    1: Array<ProductListItemType>;
    2: Array<ProductListItemType>;
  }>({ 0: [], 1: [], 2: [] });

  const fetchAllShowcaseResults = async () => {
    try {
      let promises = [];

      promises.push(
        makeSearch(
          {
            // TODO correct the queries
            [FilterDBKeys.occasion]: 'b'
          },
          { hitsPerPage: 6 }
        )
      );

      promises.push(
        makeSearch(
          {
            // TODO correct the queries
            [FilterDBKeys.relationship]: 'br'
          },
          { hitsPerPage: 6 }
        )
      );

      promises.push(
        makeSearch(
          {
            // TODO correct the queries
          },
          { hitsPerPage: 6 }
        )
      );

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
    fetchAllShowcaseResults();
  }, []);

  return (
    <section className='text-base flex flex-col space-y-16'>
      <div className='flex flex-col justify-start items-center space-y-8 md:flex-row md:items-center md:space-x-12 md:space-y-0'>
        {/* Banner Text */}
        <div className='w-full md:w-2/3 xl:w-3/4 md:mt-0 flex flex-col items-start'>
          <Text
            tag='h1'
            content='give gifts that matter'
            styleClasses='text-7xl md:text-8xl xl:text-9xl font-extrabold'
          />
          <Text
            content={`and we'll help you find them`}
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
          content={`We <em>Curate</em> and <em>Categorize</em> the top rated gifting products from trusted websites like <strong>Amazon</strong>, making this the one-stop destination for all your gifting needs! `}
          styleClasses='text-xl md:text-2xl xl:text-3xl text-center'
        />
      </div>

      <ProductShowcase
        title={`Popular Birthday Gifts`}
        seeAllLink='/search'
        products={showcaseResults[0]}
        seeAllTitle={`Find all Birthday gifts`}
      />
      <ProductShowcase
        title='Popular Gifts for Brothers'
        seeAllLink='/search'
        products={showcaseResults[1]}
        seeAllTitle={'Find all gifts for Brothers'}
      />
      <ProductShowcase
        title='Top Selling gifts'
        seeAllLink='/search'
        products={showcaseResults[2]}
        seeAllTitle={'Find all top selling gifts'}
      />

      <div>
        <TrendingSearches />
      </div>
    </section>
  );
};

export default HomePage;
