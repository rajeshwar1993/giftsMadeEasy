import {
  initPage,
  closeBrowser,
  getWebData,
  temporaryGetWebData
} from './crawler';
import * as fs from 'fs';
import { parse } from 'fast-csv';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import productList from './productList';
import { ProductDBKeys, ProductStatus } from './crawler/dbKeys';

const serviceAccount = require('../giftsmadeeasy-75edd-fc87d0f10099.json');

const PRODUCT_DB = 'products';

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
let allCSVData: any = [];

const gatherAllCSVData = async (row: any) => {
  allCSVData.push(row);
};

// function for end
const fetchDataForEachProduct = async () => {
  console.time('Op');
  let { browser, page } = await initPage();
  console.log('Starting parsing');
  const newProductCollectionRef = db.collection(PRODUCT_DB);

  // get all new products that have pending status
  const prodSnap = await newProductCollectionRef
    .where(ProductDBKeys.status, '==', ProductStatus.FetchPending.toString())
    .get();

  if (!prodSnap.empty) {
    for (let i = 0; i < prodSnap.size; i++) {
      const prod = prodSnap.docs[i].data();
      const id = prodSnap.docs[i].id;
      console.log('Starting: ', prod[ProductDBKeys.apid]);

      let data = await getWebData(page, prod[ProductDBKeys.productUrl]);

      let status = ProductStatus.FetchSuccess.toString();
      let statusMessage = [];
      if (!data.title) {
        status = ProductStatus.Error.toString();
        statusMessage.push('Error in fetching Title');
      }
      if (!data.price) {
        status = ProductStatus.Error.toString();
        statusMessage.push('Error in fetching Price');
      }
      if (!data.ogPrice) {
        status = ProductStatus.Error.toString();
        statusMessage.push('Error in fetching OG Price');
      }
      if (!data.rating) {
        status = ProductStatus.Error.toString();
        statusMessage.push('Error in fetching Rating');
      }
      if (data.overview.length === 0) {
        status = ProductStatus.Error.toString();
        statusMessage.push('Error in fetching Overview');
      }
      if (data.description.length === 0) {
        status = ProductStatus.Error.toString();
        statusMessage.push('Error in fetching Description');
      }
      if (data.images.length === 0) {
        status = ProductStatus.Error.toString();
        statusMessage.push('Error in fetching Images');
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
        [ProductDBKeys.statusMessage]: statusMessage,
        [ProductDBKeys.source]: 'amazon',
        [ProductDBKeys.custom_score]: 0
      });

      console.log('Done: ', prod[ProductDBKeys.apid]);
    }
  }

  console.log('Ending parsing');
  console.timeEnd('Op');
  closeBrowser(browser);
};

const temporaryFetchDataForEachProductFromCSV = async () => {
  console.time('Op');
  let { browser, page } = await initPage();
  console.log('Starting parsing');
  const newProductCollectionRef = db.collection(PRODUCT_DB);

  // get all new products that have pending status
  for (let i = 0; i < allCSVData.length; i++) {
    let data = await temporaryGetWebData(page, allCSVData[i].URL);

    let status = ProductStatus.FetchSuccess.toString();
    let statusMessage = [];
    if (!data.title) {
      status = ProductStatus.Error.toString();
      statusMessage.push('Error in fetching Title');
    }

    // create the affiliate url
    const apid = extractProductID(allCSVData[i].URL);

    if (!apid) {
      {
        status = ProductStatus.Error.toString();
        statusMessage.push('Error in fetching APID');
      }
    }

    console.log('Processing', apid);

    await newProductCollectionRef.add({
      [ProductDBKeys.title]: data.title,
      [ProductDBKeys.price]: data.price,
      [ProductDBKeys.ogPrice]: data.ogPrice,
      [ProductDBKeys.rating]: data.rating,
      [ProductDBKeys.overviewPoints]: data.overview,
      [ProductDBKeys.featureList]: data.description,
      [ProductDBKeys.productImgUrls]: data.images,
      [ProductDBKeys.status]: status,
      [ProductDBKeys.statusMessage]: statusMessage,
      [ProductDBKeys.source]: 'amazon',
      [ProductDBKeys.custom_score]: 0,
      [ProductDBKeys.apid]: apid,
      [ProductDBKeys.productUrl]: allCSVData[i].URL
    });
  }

  console.log('Ending parsing');
  console.timeEnd('Op');
  closeBrowser(browser);
};

const extractProductID = (url: string) => {
  let id = null;
  if (url.includes('/dp/')) {
    const arr = url.split('/');
    const i = arr.findIndex(value => value === 'dp');
    id = arr[i + 1];
  } else if (url.includes('/gp/product/')) {
    const arr = url.split('/');
    const i = arr.findIndex(value => value === 'product');
    id = arr[i + 1];
  }

  if (id) {
    id = id.split('/')[0];
    id = id.split('?')[0];

    return id;
  }

  return false;
};

const readTheFile = () => {
  return new Promise((resolve, reject) => {
    // get all the data
    fs.createReadStream('Gifts_new.csv')
      .pipe(parse({ headers: true }))
      .on('error', error => reject(error))
      .on('data', gatherAllCSVData)
      .on('end', () => resolve('Done'));
  });
};

const startProcess = async () => {
  await readTheFile();
  allCSVData = allCSVData.slice(0, 5);
  console.log('THE END', allCSVData.length);
  temporaryFetchDataForEachProductFromCSV();
};

startProcess();
