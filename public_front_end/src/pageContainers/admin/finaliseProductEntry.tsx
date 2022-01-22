import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useState } from 'react';
import DataConfig from '../../common/componentConfig';
import { FS_NEW_PRODUCTS_DB } from '../../common/constants';
import { NewProductDBKeys, ProductDBKeys } from '../../common/dbKeys';
import { Button, SectionTitle, Text } from '../../components';
import ListBoxComp from '../../components/Reusable/ListBox';
import { ListBoxOption } from '../../components/Reusable/ListBox/types';
import {
  createListboxOptions,
  DEFAULT_LIST_VALUE
} from '../../components/Reusable/ListBox/utils';
import { db } from '../../firebase';
import { convertNewProductJsonToObj, NewProduct } from '../../models/Product';

const FinaliseProductEntry = () => {
  const [productList, setProductList] = useState<Array<NewProduct>>([]);
  const [selectedProduct, setSelectedProduct] = useState<NewProduct | null>(
    null
  );

  const fetchProductsToProcess = async () => {
    try {
      const colRef = collection(db, FS_NEW_PRODUCTS_DB);
      const q = query(colRef, where(NewProductDBKeys.status, '==', 'success'));
      const snap = await getDocs(q);

      const prods: Array<NewProduct> = [];

      snap.forEach(p => prods.push(convertNewProductJsonToObj(p.data(), p.id)));

      setProductList(prods);
      setSelectedProduct(prods[0]);
    } catch (e) {
      console.log(e);
    }
  };

  const updateTags = (value: ListBoxOption, key: string) => {
    console.log(value, key);
    let s = selectedProduct;

    switch (key) {
      case ProductDBKeys.relationshipTags:
        s?.relationshipTags.push(value.value);
        break;

      default:
        break;
    }

    setSelectedProduct(state => s);
  };

  return (
    <div className='flex flex-col space-y-6'>
      <SectionTitle content='Finalise Product Entry' />
      <Button text='Fetch Products' onClick={fetchProductsToProcess} />
      <div className='flex space-x-12'>
        <div className='w-1/5'>
          <table className='w-full rounded-lg'>
            <thead>
              <tr>
                <th className='px-4 py-3 text-left bg-skin-inverted text-skin-inverted'>
                  Name
                </th>
                <th className='px-4 py-3 text-left bg-skin-inverted text-skin-inverted'>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {productList.map(p => (
                <tr
                  key={p.uid}
                  className={`cursor-pointer hover:bg-skin-inverted hover:font-semibold hover:bg-opacity-20 ${
                    selectedProduct?.uid === p.uid ? 'bg-pink-400' : ''
                  }`}
                  onClick={() => setSelectedProduct(p)}
                >
                  <td className='px-4 py-3 border-b-2 border-opacity-20 min-w-[120px] lg:min-w-[160px]'>
                    {p.tempName}
                  </td>
                  <td className='px-4 py-3 border-b-2 border-opacity-20 min-w-[120px] lg:min-w-[160px]'>
                    {p.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedProduct && (
          <div className='flex flex-col space-y-4'>
            <SectionTitle content={selectedProduct.title} />
            <div className='flex justify-between'>
              <span>
                Amazon ID: <strong>{selectedProduct.apid}</strong>
              </span>
              <span>
                Rating: <strong>{selectedProduct.rating}</strong>
              </span>
              <span>
                Price: <strong>{selectedProduct.price}</strong>
              </span>
              <span>
                OG Price: <strong>{selectedProduct.ogPrice}</strong>
              </span>
            </div>
            <div className='flex flex-col space-y-3'>
              <span>
                Product Url: <strong>{selectedProduct.productUrl}</strong>
              </span>
              <span>
                Affiliate Url: <strong>{selectedProduct.productUrl}</strong>
              </span>
            </div>
            <div className='flex space-x-4'>
              <div className='w-7/12'>
                <strong>Feature List</strong>
                <ul>
                  {selectedProduct.featureList.map(f => (
                    <li>{f}</li>
                  ))}
                </ul>
              </div>
              <div className='w-5/12'>
                <table className='table-auto'>
                  <strong>Overview points</strong>
                  <tbody>
                    {selectedProduct.overviewPoints.map((op, i) => (
                      <tr key={i}>
                        <td className='font-bold px-4 py-2'>{op.key}</td>
                        <td className='font-medium px-4 py-2'>{op.val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className='flex flex-col space-y-4'>
              <div className='flex space-x-4 border-2 border-skin-inverted p-2 rounded-lg'>
                <div className='w-1/5'>
                  <ListBoxComp
                    filterKey={ProductDBKeys.relationshipTags}
                    title={{ content: 'Relationship' }}
                    options={createListboxOptions(
                      DataConfig.relationship,
                      'Relationship'
                    )}
                    selectedOption={{
                      name: 'DEFAULT',
                      value: DEFAULT_LIST_VALUE
                    }}
                    onSelected={updateTags}
                  />
                </div>
                <div className='w-4/2'>
                  {selectedProduct.relationshipTags.length === 0
                    ? 'No tags'
                    : selectedProduct.relationshipTags.map(rt => (
                        <span>{rt}</span>
                      ))}
                </div>
              </div>
              <div className='flex space-x-4 border-2 border-skin-inverted p-2 rounded-lg'>
                <div className='w-1/5'>
                  <ListBoxComp
                    filterKey={ProductDBKeys.ageTags}
                    title={{ content: 'Age Group' }}
                    options={createListboxOptions(
                      DataConfig.ageGrp,
                      'Age Group'
                    )}
                    selectedOption={{
                      name: 'DEFAULT',
                      value: DEFAULT_LIST_VALUE
                    }}
                    onSelected={updateTags}
                  />
                </div>
                <div className='w-4/2'>
                  {selectedProduct.ageTags.length === 0 ? 'No tags' : ''}
                </div>
              </div>
              <div className='flex space-x-4 border-2 border-skin-inverted p-2 rounded-lg'>
                <div className='w-1/5'>
                  <ListBoxComp
                    filterKey={ProductDBKeys.occasionTags}
                    title={{ content: 'Occasion' }}
                    options={createListboxOptions(
                      DataConfig.occasion,
                      'Occasion'
                    )}
                    selectedOption={{
                      name: 'DEFAULT',
                      value: DEFAULT_LIST_VALUE
                    }}
                    onSelected={updateTags}
                  />
                </div>
                <div className='w-4/2'>Data</div>
              </div>
              <div className='flex space-x-4 border-2 border-skin-inverted p-2 rounded-lg'>
                <div className='w-1/5'>
                  <ListBoxComp
                    filterKey={'test'}
                    title={{ content: 'Interests' }}
                    options={[]}
                    selectedOption={{
                      name: 'DEFAULT',
                      value: DEFAULT_LIST_VALUE
                    }}
                    onSelected={updateTags}
                  />
                </div>
                <div className='w-4/2'>Data</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinaliseProductEntry;
