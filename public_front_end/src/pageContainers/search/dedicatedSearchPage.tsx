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
  const [productShowcases, setProductShowcases] = useState<
    Array<{
      title: string;
      seeAllLink: string;
      products: Array<any>;
    }>
  >([]);

  const createShowCaseTitle = (ageStr?: any) => {
    if (!ageStr) {
      return 'Gifts for all ages';
    }

    ageStr = ageStr.split('(');
    ageStr = ageStr[ageStr.length - 1];
    ageStr = ageStr.split(')')[0];

    return `Gifts for Ages ${ageStr}`;
  };

  const handleDataPull = async (fs: DedicatedSearch) => {
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
    handleDataPull(ds);
  }, [ds]);

  return (
    <>
      <section>
        <h1 className='sr-only'>{title}</h1>
        <div className='flex flex-row space-x-3 items-center flex-wrap'>
          <div>
            <SectionTitle
              content='Gifts for my'
              styleClasses='text-5xl md:!text-7xl lg:!text-8xl'
            />
          </div>
          <div>
            <SectionTitle
              content={relationshipFilterValues.get(ds.relationship)!}
              styleClasses='text-5xl md:!text-7xl lg:!text-8xl !font-bold'
            />
          </div>
          <div>
            <SectionTitle
              content='on his/her'
              styleClasses='text-5xl md:!text-7xl lg:!text-8xl'
            />
          </div>
          <div>
            <SectionTitle
              content={occasionFilterValues.get(ds.occasion)!}
              styleClasses='text-5xl md:!text-7xl lg:!text-8xl !font-bold'
            />
          </div>
        </div>

        {productShowcases.map((show, i) => {
          return (
            <div className='mt-16' key={i}>
              <ProductShowcase
                title={show.title}
                seeAllLink={show.seeAllLink}
                products={show.products}
              />
            </div>
          );
        })}
      </section>
    </>
  );
};

export default DedicatedSearchContainer;
