import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where
} from 'firebase/firestore';
import React, { useState } from 'react';
import { FS_PRODUCTS_DB } from '../../common/constants';
import { ProductDBKeys } from '../../common/dbKeys';
import { Button, SectionTitle, Text } from '../../components';
import ProductsTable from '../../components/Reusable/ProductsTable';
import { db } from '../../firebase';
import { ProductStatus } from '../../models/enums';
import Product, {
  convertProductJsonToObj,
  convertProductToJson
} from '../../models/Product';

import { app_sendToast } from '../../redux/appCommon';
import { useAppDispatch } from '../../redux/store';

const AddProductContainer = () => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [newProducts, setNewProducts] = useState<Array<Product>>([]);

  const submitFormHandler = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const productUrl = e.target[0].value;
      const affiliateUrl = e.target[1].value;
      const apid = e.target[2].value;

      const newProduct = convertProductJsonToObj(
        {
          [ProductDBKeys.status]: ProductStatus.FetchPending,
          [ProductDBKeys.apid]: apid,
          [ProductDBKeys.productUrl]: productUrl,
          [ProductDBKeys.affiliateUrl]: affiliateUrl
        },
        ''
      );

      // check if same product exists
      let colRef = collection(db, FS_PRODUCTS_DB);
      const q = query(colRef, where(ProductDBKeys.apid, '==', apid));
      const snaps = await getDocs(q);
      if (!snaps.empty) {
        dispatch(
          app_sendToast({
            message: 'Product already exists.',
            type: 'error'
          })
        );
        return;
      }

      // call method to store in db
      colRef = collection(db, FS_PRODUCTS_DB);
      const docRef = await addDoc(colRef, {
        ...convertProductToJson(newProduct),
        [ProductDBKeys.createdTS]: serverTimestamp()
      });

      dispatch(
        app_sendToast({
          message: `Added successfully. ID: ${docRef.id}`,
          type: 'info'
        })
      );

      setNewProducts(state => [
        ...state,
        {
          ...newProduct,
          uid: docRef.id
        }
      ]);

      // reset form
      e.target.reset();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='flex flex-col space-y-8'>
      <form onSubmit={submitFormHandler} className='flex space-x-12'>
        <input
          type='url'
          id='prUrl'
          className='rounded-lg w-full'
          placeholder={`Amazon Product URL`}
          required
          onChange={(e: any) => {
            let val = e.target.value;
            let id = val.split('/')[val.split('/').length - 1];
            const apidEl: any = document.getElementById('apid');
            apidEl.value = id;
          }}
        />
        <input
          type='url'
          id='afUrl'
          className='rounded-lg w-full'
          placeholder={`Amazon Affiliate Url`}
          required
        />
        <input
          type='text'
          id='apid'
          className='rounded-lg w-full'
          placeholder={`Amazon Product ID`}
          required
        />
        <Button
          text='Submit'
          defautStyle='cust-btn-btn'
          type='submit'
          styleClasses='text-lg !rounded-full !py-2 !px-2'
          wrapperClasses='mx-2'
          loading={loading}
        />
      </form>
      <div>
        <SectionTitle content='New Items' />
        <ProductsTable
          products={newProducts}
          selectedProduct={null}
          setSelectedProduct={() => {}}
        />
      </div>
    </section>
  );
};

export default AddProductContainer;
