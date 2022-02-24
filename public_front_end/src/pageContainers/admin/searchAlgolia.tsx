import {
  collection,
  getDocs,
  limit,
  query,
  where,
  WhereFilterOp
} from 'firebase/firestore';
import React, { FC, useState } from 'react';
import makeSearch from '../../common/algolia';
import { FS_PRODUCTS_DB } from '../../common/constants';
import { ProductDBKeys } from '../../common/dbKeys';
import { Button, SectionTitle } from '../../components';
import { db } from '../../firebase';
import { ProductStatus } from '../../models/enums';
import Product, {
  convertProductJsonToObj,
  convertProductToJson
} from '../../models/Product';

type Props = {
  setFilterAttributes: (filters: {
    at: { [key: string]: number };
    gt: { [key: string]: number };
    it: { [key: string]: number };
    ot: { [key: string]: number };
    rt: { [key: string]: number };
  }) => void;
};

const SearchAlgolia: FC<Props> = ({ setFilterAttributes }) => {
  const [foundProducts, setFoundProducts] = useState<Array<Product>>([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (key: string) => {
    try {
      setLoading(true);
      const res: any = await makeSearch({}, {}, key);
      const hits = res.hits.map((h: any) =>
        convertProductJsonToObj(h, h.objectID)
      );

      setFoundProducts(hits);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const extractFiltersAndSet = () => {
    let filters: {
      at: { [key: string]: number };
      gt: { [key: string]: number };
      it: { [key: string]: number };
      ot: { [key: string]: number };
      rt: { [key: string]: number };
    } = {
      at: {},
      gt: {},
      it: {},
      ot: {},
      rt: {}
    };

    foundProducts.forEach(p => {
      // for age
      p.ageTags.forEach(t => {
        filters.at[t] = 1;
      });
      // for genger
      p.genderTags.forEach(t => {
        filters.gt[t] = 1;
      });
      // for interest
      p.interestTags.forEach(t => {
        filters.it[t] = 1;
      });
      // for occasion
      p.occasionTags.forEach(t => {
        filters.ot[t] = 1;
      });
      // for relation
      p.relationshipTags.forEach(t => {
        filters.rt[t] = 1;
      });
    });

    setFilterAttributes(filters);
  };

  return (
    <div className='flex flex-col justify-between items-center'>
      <form
        onSubmit={(e: any) => {
          e.preventDefault();
          const val = e.target[0].value;
          fetchProducts(val);
        }}
        className='flex flex-row space-x-4'
      >
        <input type={'text'} id='value' placeholder='Search' required />
        <Button type='submit' text='Fetch Similar' loading={loading} />
        <Button
          type='button'
          text='Set Attributes'
          loading={loading}
          onClick={extractFiltersAndSet}
        />
      </form>

      <ol>
        {foundProducts.length > 0 && foundProducts.map(f => <li>{f.title}</li>)}
      </ol>
    </div>
  );
};

export default SearchAlgolia;
