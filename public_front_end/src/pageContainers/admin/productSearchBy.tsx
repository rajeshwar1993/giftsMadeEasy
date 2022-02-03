import {
  collection,
  getDocs,
  query,
  where,
  WhereFilterOp
} from 'firebase/firestore';
import React, { FC, useState } from 'react';
import { FS_PRODUCTS_DB } from '../../common/constants';
import { ProductDBKeys } from '../../common/dbKeys';
import { Button, SectionTitle } from '../../components';
import { db } from '../../firebase';
import { ProductStatus } from '../../models/enums';
import Product, { convertProductJsonToObj } from '../../models/Product';

type Props = {
  setFetchedProducts: (products: Array<Product>) => void;
  setSelectedProduct: (p: Product | null) => void;
};

const ProductSearchBy: FC<Props> = ({
  setFetchedProducts,
  setSelectedProduct
}) => {
  const [selectedStatus, setSelectedStatus] = useState<ProductStatus>(
    ProductStatus.FetchSuccess
  );
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (
    key: string,
    value: any,
    operator: WhereFilterOp = '=='
  ) => {
    try {
      setLoading(true);
      const colRef = collection(db, FS_PRODUCTS_DB);

      const q = query(colRef, where(key, operator, value));

      const snap = await getDocs(q);

      const prods: Array<Product> = [];

      snap.forEach(p => prods.push(convertProductJsonToObj(p.data(), p.id)));
      setFetchedProducts(prods);
      setSelectedProduct(null);
    } catch (e) {
      // TODO handle Error
    } finally {
      setLoading(false);
    }
  };

  const fetchProductsByValue = (e: any) => {
    e.preventDefault();
    const key = e.target[0].value;
    const operator = e.target[1].value as WhereFilterOp;
    const value = e.target[2].value;

    fetchProducts(key, value, operator);
  };

  return (
    <div className='flex flex-row justify-between items-center'>
      <div className='flex flex-row space-x-4'>
        <select
          id='fetchStatus'
          defaultValue={selectedStatus}
          onChange={(e: any) => {
            setSelectedStatus(e.target.value);
          }}
        >
          <option value={ProductStatus.FetchSuccess}>FetchSuccess</option>
          <option value={ProductStatus.Active}>Active</option>
          <option value={ProductStatus.FetchPending}>FetchPending</option>
          <option value={ProductStatus.Hidden}>Hidden</option>
          <option value={ProductStatus.Error}>Error</option>
        </select>
        <Button
          text='Fetch Products By Status'
          onClick={() => fetchProducts(ProductDBKeys.status, selectedStatus)}
          loading={loading}
        />
      </div>
      <SectionTitle content='OR' />

      <form onSubmit={fetchProductsByValue} className='flex flex-row space-x-4'>
        <select id='productkey' defaultValue={''} required>
          <option value={''}>Select Key</option>
          {Object.keys(ProductDBKeys).map((p, i) => {
            return (
              <option key={i} value={ProductDBKeys[p]}>
                {p}
              </option>
            );
          })}
        </select>

        <select id='operator' defaultValue={''} required>
          <option value={''}>Select Operator</option>
          <option value={'=='}>{'=='}</option>
          <option value={'<'}>{'<'}</option>
          <option value={'<='}>{'<='}</option>
          <option value={'!='}>{'!='}</option>
          <option value={'>='}>{'>='}</option>
          <option value={'>'}>{'>'}</option>
          <option value={'array-contains'}>{'array-contains'}</option>
          <option value={'in'}>{'in'}</option>
          <option value={'array-contains-any'}>{'array-contains-any'}</option>
          <option value={'not-in'}>{'not-in'}</option>
        </select>
        <input type={'text'} id='value' placeholder='value' />
        <Button
          type='submit'
          text='Fetch Products By value'
          loading={loading}
        />
      </form>
    </div>
  );
};

export default ProductSearchBy;
