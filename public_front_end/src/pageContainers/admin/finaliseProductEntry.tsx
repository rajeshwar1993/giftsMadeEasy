import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where
} from 'firebase/firestore';
import React, { useState } from 'react';
import { FS_NEW_PRODUCTS_DB, FS_PRODUCTS_DB } from '../../common/constants';
import { FilterDBKeys, ProductDBKeys } from '../../common/dbKeys';
import { Button, SectionTitle, Text } from '../../components';
import CheckBoxGroup from '../../components/Reusable/CheckBoxGroup';
import { db } from '../../firebase';
import { ProductStatus } from '../../models/enums';
import Product, {
  convertProductJsonToObj,
  convertProductToJson
} from '../../models/Product';
import { app_sendToast } from '../../redux/appCommon';
import { useAppDispatch } from '../../redux/store';
import ProductEditSection from './productEditSection';

const FinaliseProductEntry = () => {
  const [productList, setProductList] = useState<Array<Product>>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<ProductStatus>(
    ProductStatus.FetchSuccess
  );
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const fetchProductsToProcess = async () => {
    try {
      setLoading(true);
      let colname = FS_NEW_PRODUCTS_DB;
      if (
        selectedStatus === ProductStatus.Active ||
        selectedStatus === ProductStatus.Hidden
      ) {
        colname = FS_PRODUCTS_DB;
      }
      const colRef = collection(db, colname);
      const q = query(
        colRef,
        where(ProductDBKeys.status, '==', selectedStatus.toString())
      );
      const snap = await getDocs(q);

      const prods: Array<Product> = [];

      snap.forEach(p => prods.push(convertProductJsonToObj(p.data(), p.id)));

      setProductList(prods);
      setSelectedProduct(() => prods[0]);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const onCheckboxClicked = (key: string, values: Array<string>) => {
    let s: any = { ...selectedProduct };

    switch (key) {
      case ProductDBKeys.relationshipTags:
        s.relationshipTags = values;
        break;

      case ProductDBKeys.ageTags:
        s.ageTags = values;
        break;

      case ProductDBKeys.occasionTags:
        s.occasionTags = values;
        break;

      case ProductDBKeys.genderTags:
        s.genderTags = values;
        break;

      case ProductDBKeys.interestTags:
        s.interestTags = values;
        break;

      default:
        break;
    }

    setSelectedProduct(s);
  };

  const saveProduct = async () => {
    try {
      setLoading(true);
      // create json from selected product
      const prodColl = collection(db, FS_PRODUCTS_DB);
      const prodJson = convertProductToJson(selectedProduct!);

      // update producut in products collection
      await addDoc(prodColl, {
        ...prodJson,
        [ProductDBKeys.status]: ProductStatus.Active.toString(),
        [ProductDBKeys.createdTS]: serverTimestamp()
      });

      // delete from newProducts collection
      const newProdCol = collection(db, FS_NEW_PRODUCTS_DB);
      await deleteDoc(doc(newProdCol, selectedProduct?.uid));

      // delete from state list
      let pl = [...productList];
      pl = pl.filter(p => p.uid !== selectedProduct?.uid);
      setProductList(pl);
      // set selectedted product as the first one in new list
      setSelectedProduct(pl.length === 0 ? null : pl[0]);
      // send notification
      dispatch(
        app_sendToast({
          message: 'Product saved in Products Collection',
          type: 'info'
        })
      );
    } catch (e) {
      dispatch(
        app_sendToast({
          message: 'Error while saving data',
          type: 'error'
        })
      );
    } finally {
      setLoading(false);
    }
  };

  const updateProductStatus = async (status: ProductStatus) => {
    try {
      const newProdCol = collection(db, FS_NEW_PRODUCTS_DB);
      await updateDoc(doc(newProdCol, selectedProduct?.uid), {
        [ProductDBKeys.status]: status.toString()
      });
    } catch (e) {
      // TODO handle error
      console.log(e);
    }
  };

  const removeProduct = async () => {
    try {
      const newProdCol = collection(db, FS_NEW_PRODUCTS_DB);
      await deleteDoc(doc(newProdCol, selectedProduct?.uid));
    } catch (e) {
      // TODO handle error
      console.log(e);
    }
  };

  return (
    <div className='flex flex-col space-y-2'>
      <SectionTitle content='Finalise Product Entry' />
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
          text='Fetch Products'
          onClick={fetchProductsToProcess}
          loading={loading}
        />
      </div>

      <div className='flex space-x-4'>
        <div className='w-1/6'>
          <table className='w-full rounded-lg'>
            <thead>
              <tr>
                <th className='px-4 py-3 text-left bg-skin-inverted text-skin-inverted'>
                  Name
                </th>
              </tr>
            </thead>
            <tbody>
              {productList.map(p => (
                <tr
                  key={p.uid}
                  className={`cursor-pointer hover:bg-skin-inverted hover:bg-opacity-20  ${
                    selectedProduct?.uid === p.uid ? 'bg-pink-400' : ''
                  }`}
                  onClick={() => setSelectedProduct(p)}
                >
                  <td className='border-skin-inverted px-4 py-3 border-b-2 min-w-[120px] lg:min-w-[160px] text-xs'>
                    {p.title}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedProduct && (
          <div className='w-5/6'>
            <ProductEditSection
              product={selectedProduct}
              onCheckboxClicked={onCheckboxClicked}
              saveProduct={saveProduct}
              loading={loading}
              updateProductStatus={updateProductStatus}
              removeProduct={removeProduct}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FinaliseProductEntry;
