import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import useWindowSize from '../../hooks/useWindowSize';
import Filter from '../../models/Filter';
import Filters from './filters';
import ProductListing from './productListsing';
import SearchTopSection from './topSection';

let debounce: any = null;

const SearchPage = () => {
  const size = useWindowSize();
  const [isDesktop, toggleIsDesktop] = useState(true);
  const router = useRouter();
  const [filterValues, updateFilterValues] = useState<Filter>(new Filter());
  const [showMobileFilters, updateShowMobileFilters] = useState(false);

  const filterCopy = useRef({});

  // read URL values on first render
  useEffect(() => {
    // if any params present
    if (Object.keys(router.query).length > 0) {
      // create new filter object
      const f = Filter.convertJsonToObj(router.query);
      updateFilterValues(f);
    }
  }, [router.query]);

  useEffect(() => {
    if (debounce) {
      clearTimeout(debounce);
    }
    debounce = setTimeout(() => {
      if (size.width && size?.width >= 1280) {
        toggleIsDesktop(true);
        console.log(true);
      } else {
        toggleIsDesktop(false);
        console.log(false);
      }
    }, 200);
  }, [size]);

  useEffect(() => {
    if (showMobileFilters) {
      filterCopy.current = { ...filterValues.convertToJson() };
    } else {
      filterCopy.current = {};
    }
  }, [showMobileFilters]);

  const handleFilterChange = (key: string, value: string | Array<string>) => {
    // create a new Filter Object
    const fValObj = {
      ...filterValues.convertToJson(),
      [key]: value
    };

    // update local state
    updateFilterValues(Filter.convertJsonToObj(fValObj));

    // only do this instantly if in desktop mode
    if (isDesktop) {
      // update URL state
      router.replace({
        pathname: '/search',
        query: fValObj
      });

      // make query
    }
    console.log(Filter.convertJsonToObj(fValObj));
  };

  return (
    <section className='py-0'>
      <SearchTopSection
        filterValues={filterValues}
        updateParentState={handleFilterChange}
        openMobileFilter={() => updateShowMobileFilters(true)}
      />
      {/* Filter and List */}
      <div className='flex flex-row xl:mt-0 mt-4'>
        <Filters
          filterValues={filterValues}
          updateParentState={handleFilterChange}
          showMobileFilters={showMobileFilters}
          onCloseMobileFilters={() => {
            const f = Filter.convertJsonToObj(filterCopy.current);
            updateFilterValues(f);
            updateShowMobileFilters(false);
          }}
        />

        <div className='xl:px-4 w-full xl:w-4/5'>
          <ProductListing />
        </div>
      </div>
    </section>
  );
};

export default SearchPage;
