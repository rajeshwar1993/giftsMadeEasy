import * as fs from 'fs';
import { parse } from 'fast-csv';
import { initPage, closeBrowser, getWebData } from './crawler';

import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';

const serviceAccount = require('../giftsmadeeasy-75edd-fc87d0f10099.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

let allCSVData: any = [];

// function for error handling

// function to work on the data

const gatherAllCSVData = async (row: any) => {
  allCSVData.push(row);
};

// function for end
const fetchDataForEachProduct = async () => {
  console.time('Op');
  let { browser, page } = await initPage();
  console.log('Starting parsing');
  const docRef = db.collection('products');

  for (let i = 0; i < allCSVData.length; i++) {
    let data = await getWebData(page, allCSVData[i].URL);
    console.log(data);

    await docRef.add({
      title: data.title,
      price: data.price,
      rating: data.rating,
      totalRatings: data.totalRatings,
      overview: data.overview,
      description: data.description
    });
  }

  console.log('Ending parsing');
  console.timeEnd('Op');
  closeBrowser(browser);
};

const readTheFile = () => {
  return new Promise((resolve, reject) => {
    // get all the data
    fs.createReadStream('Gifts.csv')
      .pipe(parse({ headers: true }))
      .on('error', error => reject(error))
      .on('data', gatherAllCSVData)
      .on('end', () => resolve('Done'));
  });
};

const startProcess = async () => {
  await readTheFile();

  console.log('THE END', allCSVData.length);
  fetchDataForEachProduct();
};

startProcess();
