import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Filter from '../../../models/Filter';
import Filters from './filters';
import ProductListing from './productListsing';
import SearchTopSection from './topSection';

const SearchPage = () => {
  const router = useRouter();
  const [filterValues, updateFilterValues] = useState<Filter>(new Filter());

  // read URL values on first render
  useEffect(() => {
    // if any params present
    if (Object.keys(router.query).length > 0) {
      // create new filter object
      const f = Filter.convertJsonToObj(router.query);
      updateFilterValues(f);
    }
  }, [router.query]);

  return (
    <section className='py-0'>
      <SearchTopSection />
      {/* Filter and List */}
      <div className='flex flex-row xl:mt-0 mt-4'>
        <Filters filterValues={filterValues} />

        <div className='xl:px-4 w-full xl:w-4/5'>
          <ProductListing />
        </div>
      </div>
    </section>
  );
};

export default SearchPage;
