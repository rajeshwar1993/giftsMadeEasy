import * as fs from 'fs';
import { parse } from 'fast-csv';
import { initPage, closeBrowser, getWebData } from './crawler';

import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
import productList from './productList';
import { ProductDBKeys } from './crawler/dbKeys';

const serviceAccount = require('../giftsmadeeasy-75edd-fc87d0f10099.json');

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
  const docRef = db.collection('products');

  for (let i = 0; i < list.length; i++) {
    let data = await getWebData(page, list[i].url);
    console.log(data);

    await docRef.add({
      [ProductDBKeys.apid]: list[i].id,
      [ProductDBKeys.productUrl]: list[i].url,
      [ProductDBKeys.title]: data.title,
      [ProductDBKeys.price]: data.price,
      [ProductDBKeys.ogPrice]: data.ogPrice,
      [ProductDBKeys.rating]: data.rating,
      [ProductDBKeys.overviewPoints]: data.overview,
      [ProductDBKeys.featureList]: data.description
    });
  }

  console.log('Ending parsing');
  console.timeEnd('Op');
  closeBrowser(browser);
};

// const readTheFile = () => {
//   return new Promise((resolve, reject) => {
//     // get all the data
//     fs.createReadStream('Gifts.csv')
//       .pipe(parse({ headers: true }))
//       .on('error', error => reject(error))
//       .on('data', gatherlist)
//       .on('end', () => resolve('Done'));
//   });
// };

const startProcess = async () => {
  // await readTheFile();

  fetchDataForEachProduct();
};

startProcess();
