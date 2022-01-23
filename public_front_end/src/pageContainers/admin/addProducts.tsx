import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  where
} from 'firebase/firestore';
import React, { useState } from 'react';
import { FS_NEW_PRODUCTS_DB, FS_PRODUCTS_DB } from '../../common/constants';
import { ProductDBKeys } from '../../common/dbKeys';
import { Button } from '../../components';
import { db } from '../../firebase';
import {
  convertProductJsonToObj,
  convertProductToJson
} from '../../models/Product';

import { app_sendToast } from '../../redux/appCommon';
import { useAppDispatch } from '../../redux/store';

const AddProductContainer = () => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const submitFormHandler = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const productUrl = e.target[0].value;
      const affiliateUrl = e.target[1].value;
      const apid = e.target[2].value;

      const newProduct = convertProductJsonToObj(
        {
          [ProductDBKeys.status]: 'pending',
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
      colRef = collection(db, FS_NEW_PRODUCTS_DB);
      await addDoc(colRef, {
        ...convertProductToJson(newProduct),
        [ProductDBKeys.createdTS]: serverTimestamp()
      });

      dispatch(
        app_sendToast({
          message: 'Added successfully.',
          type: 'info'
        })
      );

      // reset form
      e.target.reset();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className=''>
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
    </section>
  );
};

export default AddProductContainer;
