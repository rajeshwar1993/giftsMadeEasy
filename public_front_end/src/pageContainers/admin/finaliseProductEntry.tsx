import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where
} from 'firebase/firestore';
import React, { useState } from 'react';
import DataConfig from '../../common/componentConfig';
import { FS_NEW_PRODUCTS_DB, FS_PRODUCTS_DB } from '../../common/constants';
import {
  FilterDBKeys,
  NewProductDBKeys,
  ProductDBKeys
} from '../../common/dbKeys';
import { Button, SectionTitle, Text } from '../../components';
import CheckBoxGroup from '../../components/Reusable/CheckBoxGroup';
import { db } from '../../firebase';
import {
  convertNewProductJsonToObj,
  convertNewProductToJson,
  convertProductJsonToObj,
  convertProductToJson,
  NewProduct
} from '../../models/Product';
import { app_sendToast } from '../../redux/appCommon';
import { useAppDispatch } from '../../redux/store';
import ImageCarouselSection from '../product/ImageCarouselSection';

const FinaliseProductEntry = () => {
  const [productList, setProductList] = useState<Array<NewProduct>>([]);
  const [selectedProduct, setSelectedProduct] = useState<NewProduct | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const fetchProductsToProcess = async () => {
    try {
      setLoading(true);
      const colRef = collection(db, FS_NEW_PRODUCTS_DB);
      const q = query(colRef, where(NewProductDBKeys.status, '==', 'success'));
      const snap = await getDocs(q);

      const prods: Array<NewProduct> = [];

      snap.forEach(p => prods.push(convertNewProductJsonToObj(p.data(), p.id)));

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
      const prodJson = convertProductToJson(
        convertProductJsonToObj(convertNewProductToJson(selectedProduct!), '')
      );

      // update producut in products collection
      await addDoc(prodColl, prodJson);

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

  return (
    <div className='flex flex-col space-y-2'>
      <SectionTitle content='Finalise Product Entry' />
      <Button
        text='Fetch Products'
        onClick={fetchProductsToProcess}
        loading={loading}
      />
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
                  <td className='border-skin-inverted px-4 py-3 border-b-2 min-w-[120px] lg:min-w-[160px]'>
                    {p.tempName}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedProduct && (
          <div className='flex flex-col space-y-4'>
            <div className='flex space-x-4'>
              <ImageCarouselSection images={selectedProduct.productImgUrls} />
              <div className='flex flex-col space-y-4'>
                <SectionTitle
                  content={selectedProduct.title}
                  styleClasses='!text-3xl'
                />
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
                    <ul className='list-disc'>
                      {selectedProduct.featureList.map((f, i) => (
                        <li key={i}>{f}</li>
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
              </div>
            </div>

            <div className='flex flex-row space-x-4'>
              <div className='flex flex-col space-x-4 border-2 border-skin-inverted p-2 rounded-lg'>
                <Text content='Relationship Tags' />
                <div className='flex space-x-4'>
                  {
                    <CheckBoxGroup
                      filterKey={ProductDBKeys.relationshipTags}
                      checkList={Object.keys(DataConfig.relationship).map(
                        (key: any, i) => ({
                          text: key,
                          value: DataConfig.relationship[key]
                        })
                      )}
                      selected={selectedProduct.relationshipTags}
                      onChangeHandler={onCheckboxClicked}
                    />
                  }
                </div>
              </div>
              <div className='flex flex-col space-x-4 border-2 border-skin-inverted p-2 rounded-lg'>
                <Text content='Age Tags' />
                <div className='flex space-x-4'>
                  {
                    <CheckBoxGroup
                      filterKey={ProductDBKeys.ageTags}
                      checkList={Object.keys(DataConfig.ageGrp).map(
                        (key: any, i) => ({
                          text: key,
                          value: DataConfig.ageGrp[key]
                        })
                      )}
                      selected={selectedProduct.ageTags}
                      onChangeHandler={onCheckboxClicked}
                    />
                  }
                </div>
              </div>
              <div className='flex flex-col space-x-4 border-2 border-skin-inverted p-2 rounded-lg'>
                <Text content='Occasion Tags' />
                <div className='flex space-x-4'>
                  {
                    <CheckBoxGroup
                      filterKey={ProductDBKeys.occasionTags}
                      checkList={Object.keys(DataConfig.occasion).map(
                        (key: any, i) => ({
                          text: key,
                          value: DataConfig.occasion[key]
                        })
                      )}
                      selected={selectedProduct.occasionTags}
                      onChangeHandler={onCheckboxClicked}
                    />
                  }
                </div>
              </div>
            </div>
            <Button text='Save' onClick={saveProduct} loading={loading} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FinaliseProductEntry;
