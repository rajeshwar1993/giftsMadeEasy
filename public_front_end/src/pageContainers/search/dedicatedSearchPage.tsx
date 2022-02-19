import React, { FC, useEffect, useState } from 'react';
import makeSearch from '../../common/algolia';
import AppConfig from '../../common/appConfig';
import { FilterDBKeys } from '../../common/dbKeys';
import {
  ageGrpFilterValues,
  occasionFilterValues,
  relationshipFilterValues
} from '../../common/staticFilterValues';
import { Button, SectionTitle, Text } from '../../components';
import ListBoxComp from '../../components/Reusable/ListBox';
import { ListBoxOption } from '../../components/Reusable/ListBox/types';
import {
  createListboxOptions,
  getOptionFromValue
} from '../../components/Reusable/ListBox/utils';
import SelectInterestsPopup from '../../components/Reusable/SelectInterestsPopup';
import DedicatedSearch, {
  convertDedicatedSearchToJson,
  convertDedicatedSearchToJsonForSearch,
  convertJsonToDedicatedSearchObj
} from '../../models/DedicatedSearch';
import Filter from '../../models/Filter';
import { convertProductJsonToObj } from '../../models/Product';
import ProductShowcase from '../home/productShowcase';
import ShowSelectedInterests from './showSelectedInterests';

type Props = {
  ds: DedicatedSearch;
  title: string;
};

const DedicatedSearchContainer: FC<Props> = ({ title, ds }) => {
  const [filterState, setFilterState] = useState<DedicatedSearch>(ds);
  const [interestPopoverOpen, setInterestPopoverOpen] =
    useState<boolean>(false);

  const [productShowcases, setProductShowcases] = useState<
    Array<{
      title: string;
      seeAllLink: string;
      products: Array<any>;
    }>
  >([]);

  const updateValues = (data: ListBoxOption, key: string) => {
    setFilterState(state =>
      convertJsonToDedicatedSearchObj(
        {
          ...convertDedicatedSearchToJson(state),
          [key]: data.value
        },
        ds.uid
      )
    );
  };

  const updateInterests = (data: Array<string>) => {
    setFilterState(state =>
      convertJsonToDedicatedSearchObj(
        {
          ...convertDedicatedSearchToJson(state),
          [FilterDBKeys.interests]: data
        },
        ds.uid
      )
    );
  };

  const createShowCaseTitle = (ageStr?: any) => {
    if (!ageStr) {
      return 'Gifts for all ages';
    }

    ageStr = ageStr.split('(');
    ageStr = ageStr[ageStr.length - 1];
    ageStr = ageStr.split(')')[0];

    return `Gifts for Ages ${ageStr}`;
  };

  const handleChangeInFilters = async (fs: DedicatedSearch) => {
    if (!fs.relationship && !fs.occasion) {
      setProductShowcases([]);
      return;
    }

    let searchPromises: any[] = [];
    let ps: Array<{
      title: string;
      seeAllLink: string;
      products: Array<any>;
    }> = [];

    fs.ageGrp.forEach(age => {
      ps.push({
        title: createShowCaseTitle(ageGrpFilterValues.get(age)),
        seeAllLink: '/search',
        products: []
      });
      searchPromises.push(
        makeSearch(
          convertDedicatedSearchToJsonForSearch({ ...fs, ageGrp: [age] })
        )
      );
    });

    // setProductShowcases(ps);

    let res = await Promise.allSettled(searchPromises);

    res.forEach((r, i) => {
      if (r.status === 'fulfilled') {
        const data = r.value;
        ps[i].products = data.hits.map((h: any) =>
          convertProductJsonToObj(h, h.objectID)
        );
      }
    });
    console.log(ps);
    setProductShowcases(ps);
  };

  useEffect(() => {
    handleChangeInFilters(filterState);
  }, [filterState]);

  return (
    <>
      <section>
        <h1 className='sr-only'>{title}</h1>
        <div className='flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 items-center flex-wrap'>
          <SectionTitle content='Gifts for my' />
          <div className='pb-4 w-80'>
            <ListBoxComp
              filterKey={FilterDBKeys.relationship}
              selectedOption={getOptionFromValue(
                relationshipFilterValues,
                filterState.relationship,
                AppConfig.COMMON.relationshipLabel
              )}
              onSelected={updateValues}
              options={createListboxOptions(
                relationshipFilterValues,
                AppConfig.COMMON.relationshipLabel
              )}
              buttonStyleClasses='text-3xl md:text-5xl font-light text-center border-l-0 border-r-0 border-t-0 border-b-2 rounded-none border-skin-accent'
            />
          </div>
          <SectionTitle
            content='on his/her'
            styleClasses='text-3xl md:text-4xl lg:text-5xl'
          />
          <div className='pb-4 w-80'>
            <ListBoxComp
              filterKey={FilterDBKeys.occasion}
              selectedOption={getOptionFromValue(
                occasionFilterValues,
                filterState.occasion,
                AppConfig.COMMON.occasionLabel
              )}
              onSelected={updateValues}
              options={createListboxOptions(
                occasionFilterValues,
                AppConfig.COMMON.occasionLabel
              )}
              buttonStyleClasses='text-3xl md:text-5xl font-light text-center border-l-0 border-r-0 border-t-0 border-b-2 rounded-none border-skin-accent'
            />
          </div>
        </div>
        <div className='flex flex-col items-center md:items-start'>
          <div className='flex space-x-3 mb-3 items-center '>
            <Text
              content='and is interested in'
              styleClasses='text-xl md:text-2xl'
            />
            <Button
              text={`Select ${AppConfig.SEARCH.interestsLabel} ${
                filterState.interests.length
                  ? ` (${filterState.interests.length})`
                  : ''
              }`}
              defautStyle='cust-btn-link'
              styleClasses='text-base pt-1'
              wrapperClasses=''
              onClick={() => setInterestPopoverOpen(true)}
            />
          </div>
          <ShowSelectedInterests
            values={filterState.interests}
            onCancel={updated => {
              updateInterests(updated);
            }}
          />
        </div>

        {productShowcases.map((show, i) => {
          return (
            <div className='mt-16' key={i}>
              <ProductShowcase
                title={show.title}
                seeAllLink={show.seeAllLink}
                products={show.products}
              />{' '}
            </div>
          );
        })}
      </section>
      <SelectInterestsPopup
        open={interestPopoverOpen}
        selectedInts={filterState.interests ? filterState.interests : []}
        onSave={updateInterests}
        onClose={() => setInterestPopoverOpen(false)}
      />
    </>
  );
};

export default DedicatedSearchContainer;
