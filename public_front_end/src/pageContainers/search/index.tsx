import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import makeSearch from '../../common/algolia';
import { FilterDBKeys, ProductDBKeys } from '../../common/dbKeys';
import { cleanObject } from '../../common/utils';
import { Button } from '../../components';
import { ProductListItemType } from '../../components/Reusable/ProductListItem/type';
import { ProductStatus } from '../../models/enums';
import Filter from '../../models/Filter';
import Product, { convertProductJsonToObj } from '../../models/Product';
import { RootState } from '../../redux/store';
import Filters from './filters';
import ProductListing from './productListsing';
import SearchTopSection from './topSection';

const SearchPage = () => {
  const router = useRouter();
  const [filterValues, updateFilterValues] = useState<Filter>(new Filter());
  const [showMobileFilters, updateShowMobileFilters] = useState(false);
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<{
    items: Array<Product>;
    nbHits: number;
    page: number;
    nbPages: number;
  }>({ items: [], nbHits: 0, page: 0, nbPages: 0 });

  const isDesktop = useSelector((state: RootState) => state.app.isDesktop);

  const filterCopy = useRef({});

  // read URL values on first render
  useEffect(() => {
    // create new filter object
    const f = Filter.convertJsonToObj(router.query);
    updateFilterValues(f);
    makeQuery(f.convertToJson(), { page: 0 });
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
      query: cleanObject(fValObj)
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
    if (isDesktop || key === FilterDBKeys.interests) {
      // update URL state
      router.replace({
        pathname: '/search',
        query: cleanObject(fValObj)
      });
    }
    // console.log(Filter.convertJsonToObj(fValObj));
  };

  const makeQuery = async (fValObj: any, options: any = {}) => {
    try {
      setLoading(options.page === 0);
      let res: any = await makeSearch(fValObj, options);
      let { page, nbPages, nbHits } = res;
      const hits = res.hits.map((h: any) =>
        convertProductJsonToObj(h, h.objectID)
      );
      setResult(state => ({
        ...state,
        items: page > 0 ? state.items.concat(hits) : hits,
        nbHits,
        nbPages,
        page
      }));
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreResults = () => {
    if (result.page + 1 < result.nbPages)
      makeQuery(filterValues.convertToJson(), { page: result.page + 1 });
  };

  const handleClearFilters = (onlyFilters: boolean = false) => {
    // update URL state with empty query obj
    let f: any = {};
    if (onlyFilters) {
      f = filterValues.convertToJson();
      for (let key in f) {
        if (key !== FilterDBKeys.interests) {
          if (Array.isArray(f[key])) {
            f[key] = [];
          } else if (typeof f[key] === 'string') {
            f[key] = '';
          }
        }
      }
    }
    router.replace({
      pathname: '/search',
      query: f
    });
  };

  return (
    <section className='py-0'>
      <SearchTopSection
        filterValues={filterValues}
        updateParentState={handleFilterChange}
        openMobileFilter={() => updateShowMobileFilters(true)}
        handleClearFilters={handleClearFilters}
        resultCount={result.nbHits}
        loading={loading}
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

        <div className='lg:px-4 w-full lg:w-4/5 pt-2'>
          <ProductListing
            results={result.items}
            loading={loading}
            loadMoreResults={loadMoreResults}
            page={result.page}
            totalPages={result.nbPages}
          />
        </div>
      </div>
    </section>
  );
};

export default SearchPage;
