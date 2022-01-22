import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  where
} from 'firebase/firestore';
import React, { useState } from 'react';
import { FS_NEW_PRODUCTS_DB, FS_PRODUCTS_DB } from '../../common/constants';
import { NewProductDBKeys, ProductDBKeys } from '../../common/dbKeys';
import { Button } from '../../components';
import { db } from '../../firebase';
import {
  convertNewProductJsonToObj,
  convertNewProductToJson
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
      const tempname = e.target[0].value;
      const apid = e.target[1].value;
      const productUrl = e.target[2].value;
      const affiliateUrl = e.target[3].value;

      const newProduct = convertNewProductJsonToObj(
        {
          [NewProductDBKeys.tempName]: tempname,
          [NewProductDBKeys.status]: 'pending',
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
      await addDoc(colRef, convertNewProductToJson(newProduct));

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
          type='text'
          id='tname'
          className='rounded-lg w-full'
          placeholder={`Temp Name`}
          required
        />
        <input
          type='text'
          id='apid'
          className='rounded-lg w-full'
          placeholder={`Amazon Product ID`}
          required
        />
        <input
          type='url'
          id='prUrl'
          className='rounded-lg w-full'
          placeholder={`Amazon Product URL`}
          required
        />
        <input
          type='url'
          id='afUrl'
          className='rounded-lg w-full'
          placeholder={`Amazon Affiliate Url`}
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
