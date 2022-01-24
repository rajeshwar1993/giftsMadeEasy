import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import makeSearch from '../../common/algolia';
import { ProductListItemType } from '../../components/Reusable/ProductListItem/type';
import Filter from '../../models/Filter';
import { RootState } from '../../redux/store';
import Filters from './filters';
import ProductListing from './productListsing';
import SearchTopSection from './topSection';

const SearchPage = () => {
  const router = useRouter();
  const [filterValues, updateFilterValues] = useState<Filter>(new Filter());
  const [showMobileFilters, updateShowMobileFilters] = useState(false);

  const [results, setResults] = useState<Array<ProductListItemType>>([]);

  const isDesktop = useSelector((state: RootState) => state.app.isDesktop);

  const filterCopy = useRef({});

  // read URL values on first render
  useEffect(() => {
    // if any params present
    if (Object.keys(router.query).length > 0) {
      // create new filter object
      const f = Filter.convertJsonToObj(router.query);
      updateFilterValues(f);
      makeQuery(f.convertToJson());
    } else {
      makeQuery({});
    }
  }, [router.query]);

  // update the filter copy when opening mobile filters
  useEffect(() => {
    if (showMobileFilters) {
      filterCopy.current = { ...filterValues.convertToJson() };
    } else {
      filterCopy.current = {};
    }
  }, [showMobileFilters]);

  const handleApplyFilters = () => {
    // close filter overlay
    updateShowMobileFilters(false);
    // create a new Filter Object
    const fValObj = {
      ...filterValues.convertToJson()
    };
    // update URL state
    router.replace({
      pathname: '/search',
      query: fValObj
    });
  };

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
    }
    console.log(Filter.convertJsonToObj(fValObj));
  };

  const makeQuery = async (fValObj: any) => {
    let res: any = await makeSearch(fValObj);
    console.log(res);
    const hits = res.hits as Array<ProductListItemType>;
    setResults(hits);
  };

  return (
    <section className='py-0'>
      <SearchTopSection
        filterValues={filterValues}
        updateParentState={handleFilterChange}
        openMobileFilter={() => updateShowMobileFilters(true)}
      />
      {/* Filter and List */}
      <div className='flex flex-row lg:mt-0 mt-4'>
        <Filters
          filterValues={filterValues}
          updateParentState={handleFilterChange}
          showMobileFilters={showMobileFilters}
          applyMobileFilters={handleApplyFilters}
          onCloseMobileFilters={() => {
            const f = Filter.convertJsonToObj(filterCopy.current);
            updateFilterValues(f);
            updateShowMobileFilters(false);
          }}
        />

        <div className='lg:px-4 w-full lg:w-4/5'>
          <ProductListing results={results} />
        </div>
      </div>
    </section>
  );
};

export default SearchPage;
