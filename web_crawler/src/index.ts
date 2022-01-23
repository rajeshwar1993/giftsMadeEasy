import { initPage, closeBrowser, getWebData } from './crawler';

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import productList from './productList';
import { ProductDBKeys } from './crawler/dbKeys';

const serviceAccount = require('../giftsmadeeasy-75edd-fc87d0f10099.json');

const PRODUCT_DB = 'products';
const NEW_PRODUCT_DB = 'newProducts';

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const list = productList;

// function for error handling

// function to work on the data

// function for end
const fetchDataForEachProduct = async () => {
  console.time('Op');
  let { browser, page } = await initPage();
  console.log('Starting parsing');
  const newProductCollectionRef = db.collection(NEW_PRODUCT_DB);

  // get all new products that have pending status
  const prodSnap = await newProductCollectionRef
    .where(ProductDBKeys.status, '==', 'pending')
    .get();

  if (!prodSnap.empty) {
    for (let i = 0; i < prodSnap.size; i++) {
      const prod = prodSnap.docs[i].data();
      const id = prodSnap.docs[i].id;
      console.log('Starting: ', prod[ProductDBKeys.apid]);

      let data = await getWebData(page, prod[ProductDBKeys.productUrl]);

      let status = 'success';
      let statusMessage = '';
      if (!data.title) {
        status = 'error';
        statusMessage = statusMessage + 'Error in fetching Title\n';
      }
      if (!data.price) {
        status = 'error';
        statusMessage = statusMessage + 'Error in fetching Ptice\n';
      }
      if (!data.ogPrice) {
        status = 'error';
        statusMessage = statusMessage + 'Error in fetching OG Price\n';
      }
      if (!data.rating) {
        status = 'error';
        statusMessage = statusMessage + 'Error in fetching Rating\n';
      }
      if (data.overview.length === 0) {
        status = 'error';
        statusMessage = statusMessage + 'Error in fetching Overview\n';
      }
      if (data.description.length === 0) {
        status = 'error';
        statusMessage = statusMessage + 'Error in fetching Description\n';
      }
      if (data.images.length === 0) {
        status = 'error';
        statusMessage = statusMessage + 'Error in fetching Images\n';
      }

      await newProductCollectionRef.doc(id).update({
        [ProductDBKeys.title]: data.title,
        [ProductDBKeys.price]: data.price,
        [ProductDBKeys.ogPrice]: data.ogPrice,
        [ProductDBKeys.rating]: data.rating,
        [ProductDBKeys.overviewPoints]: data.overview,
        [ProductDBKeys.featureList]: data.description,
        [ProductDBKeys.productImgUrls]: data.images,
        [ProductDBKeys.status]: status,
        [ProductDBKeys.statusMessage]: statusMessage
      });

      console.log('Done: ', prod[ProductDBKeys.apid]);
    }
  }

  console.log('Ending parsing');
  console.timeEnd('Op');
  closeBrowser(browser);
};

const startProcess = async () => {
  fetchDataForEachProduct();
};

startProcess();
