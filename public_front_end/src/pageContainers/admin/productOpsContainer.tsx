import { collection, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { FS_PRODUCTS_DB } from '../../common/constants';
import { ProductDBKeys } from '../../common/dbKeys';
import ProductsTable from '../../components/Reusable/ProductsTable';
import { db } from '../../firebase';
import { Gender, ProductStatus } from '../../models/enums';
import Product, { convertProductToJson } from '../../models/Product';
import { app_sendToast } from '../../redux/appCommon';
import { useAppDispatch } from '../../redux/store';
import ProductEditSection from './productEditSection';
import ProductSearchBy from './productSearchBy';
import SearchAlgolia from './searchAlgolia';

const ProductOpsContainer = () => {
  const [products, setProducts] = useState<Array<Product>>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const checkboxClickHandler = (key: string, values: Array<string>) => {
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

      case ProductDBKeys.festivalTags:
        s.festivalTags = values;
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

      await updateDoc(doc(prodColl, selectedProduct?.uid), {
        ...prodJson
      });

      // send notification
      dispatch(
        app_sendToast({
          message: 'Product saved.',
          type: 'info'
        })
      );
    } catch (e) {
      console.log(e);
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
      setLoading(true);
      const prodCol = collection(db, FS_PRODUCTS_DB);
      await updateDoc(doc(prodCol, selectedProduct?.uid), {
        [ProductDBKeys.status]: status.toString()
      });
      setProducts(products =>
        products.map(p =>
          p.uid === selectedProduct?.uid
            ? { ...p, [ProductDBKeys.status]: status }
            : p
        )
      );
      // send notification
      dispatch(
        app_sendToast({
          message: 'Product updated.',
          type: 'info'
        })
      );
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const setFilterAttributes = (filters: {
    at: { [key: string]: number };
    gt: { [key: string]: number };
    it: { [key: string]: number };
    ot: { [key: string]: number };
    rt: { [key: string]: number };
  }) => {
    if (selectedProduct) {
      let tempProd = { ...selectedProduct };

      // for age
      tempProd.ageTags = Object.keys(filters.at);
      // for genger
      tempProd.genderTags = Object.keys(filters.gt).map(g => {
        if (g === Gender.Male.toString()) {
          return Gender.Male;
        }
        return Gender.Female;
      });
      // for interest
      tempProd.interestTags = Object.keys(filters.it);
      // for occasion
      tempProd.occasionTags = Object.keys(filters.ot);
      // for relation
      tempProd.relationshipTags = Object.keys(filters.rt);
      setSelectedProduct(tempProd);
    }
  };

  return (
    <section className='space-y-4'>
      <ProductSearchBy
        setFetchedProducts={products => setProducts(products)}
        setSelectedProduct={setSelectedProduct}
      />
      {selectedProduct && (
        <SearchAlgolia setFilterAttributes={setFilterAttributes} />
      )}
      <div className='flex flex-row space-x-4 p-2 border-t-2'>
        <div className='w-2/5'>
          <ProductsTable
            products={products}
            setSelectedProduct={setSelectedProduct}
            selectedProduct={selectedProduct}
          />
        </div>
        {selectedProduct && (
          <ProductEditSection
            product={selectedProduct}
            onCheckboxClicked={checkboxClickHandler}
            saveProduct={saveProduct}
            loading={loading}
            updateProductStatus={updateProductStatus}
            removeProduct={() => {}}
          />
        )}
      </div>
    </section>
  );
};

export default ProductOpsContainer;
