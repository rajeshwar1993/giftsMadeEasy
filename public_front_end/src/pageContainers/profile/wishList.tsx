import { collection, doc, getDoc } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FS_PRODUCTS_DB } from '../../common/constants';
import { Text } from '../../components';
import ProductListItemMini from '../../components/Reusable/ProductListItem/listItemMini';
import { db } from '../../firebase';
import Product, {
  convertProductJsonToObj,
  convertProductToJson
} from '../../models/Product';
import { pl_addProducts } from '../../redux/productList';
import { RootState, useAppDispatch } from '../../redux/store';

type Props = {
  tagLine: string;
  inputList: Array<string>;
};

const ProductListSection: FC<Props> = ({ tagLine, inputList }) => {
  const productsList = useSelector((state: RootState) => state.products.list);
  const dispatch = useAppDispatch();
  const [listItems, setListItems] = useState<Array<Product>>([]);

  const processTheList = async (list: Array<string>) => {
    try {
      const colRef = collection(db, FS_PRODUCTS_DB);
      let promises: any = [];

      list.forEach(l => {
        if (!productsList[l]) {
          const dp = getDoc(doc(colRef, l));
          promises.push(dp);
        }
      });

      const res = await Promise.allSettled(promises);

      let productsToAdd: { [key: string]: Product } = {};

      res.forEach(r => {
        if (r.status === 'fulfilled') {
          const doc = r.value;
          productsToAdd[doc.id] = convertProductJsonToObj(doc.data(), doc.id);
        }
      });

      const fullList = { ...productsList, ...productsToAdd };
      let wl: Array<Product> = [];
      list.forEach(l => {
        if (!!fullList[l]) {
          wl.push(fullList[l]);
        }
      });

      // set the state
      setListItems(wl);

      // dispatch redux
      dispatch(pl_addProducts(productsToAdd));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (inputList.length > 0) processTheList(inputList);
  }, [inputList]);

  return (
    <div id={'wishlist'}>
      <Text content={tagLine} />
      <div className='grid grid-cols-1 xl:grid-cols-6 gap-2 w-full'>
        {listItems.map(wl => (
          <ProductListItemMini
            key={wl.uid}
            t={wl.title}
            piu={wl.productImgUrls}
            path={`/products/${wl.uid}`}
            objectID={wl.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductListSection;
