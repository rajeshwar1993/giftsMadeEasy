import puppeteer, { Browser, Page } from 'puppeteer';
import cheerio from 'cheerio';
import { selectors } from './dataSectors';

const initPage = async () => {
  const browser: Browser = await puppeteer.launch({ headless: true });
  const page: Page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 800 });

  return { browser, page };
};

const getWebData = async (page: Page, url: string) => {
  await page.goto(url, { waitUntil: 'load', timeout: 30000 });

  let html = await page.evaluate(() => document.body.innerHTML);

  const $ = cheerio.load(html);

  // TRIAL

  const allData: {
    title: string;
    price: string;
    ogPrice: string;
    rating: string;
    overview: Array<any>;
    description: Array<string>;
    images: Array<string>;
  } = {
    title: '',
    price: '',
    ogPrice: '',
    rating: '',
    overview: [],
    description: [],
    images: []
  };

  // get title
  allData.title = $(selectors.title).text().trim();

  // get price
  const priceRows = $(selectors.price).find('tr');

  if (priceRows.length > 0) {
    let ogPrice = $(priceRows[0]).find('.a-offscreen').text();
    allData.ogPrice = ogPrice;
    let finalPrice = $(priceRows[1]).find('.a-offscreen').text();
    allData.price = finalPrice;
    if (!finalPrice) {
      allData.price = ogPrice;
    }
  } else {
    const priceDiv = $(selectors.price2);
    if (priceDiv) {
      let finalPrice = $(priceDiv)
        .find('.priceToPay')
        .find('.a-offscreen')
        .text();
      let ogPrice = $(priceDiv).find('.basisPrice').find('.a-offscreen').text();
      allData.ogPrice = ogPrice;
      allData.price = finalPrice;
    }
  }

  // get rating
  allData.rating = $(selectors.rating).text().split(' ')[0];

  // get overview
  const rows = $(selectors.overview);

  // get overview
  rows.each((i, row) => {
    const children = $(row).children();
    const key = $(children[0]).find('span').text();
    const val = $(children[1]).find('span').text();

    allData.overview.push({ key, val });
  });

  // get description
  const desc = $(selectors.description);

  desc.each((i, desc) => {
    const val = $(desc).find('span').text().trim();
    allData.description.push(val);
  });

  // get images
  const imgsTh = await page.$$(selectors.imageThubms);
  for (let th of imgsTh) {
    //hover on each element handle
    await th.hover();
    await page.waitForTimeout(100);
  }
  await page.waitForTimeout(1000);

  const imgs = await page.$$(selectors.images);

  for (let img of imgs) {
    // allData.images.push(src);
    let src: any = await (await img.getProperty('src')).jsonValue();
    allData.images.push(src);
  }

  return allData;
};

const temporaryGetWebData = async (page: Page, url: string) => {
  await page.goto(url, { waitUntil: 'load', timeout: 30000 });

  let html = await page.evaluate(() => document.body.innerHTML);

  const $ = cheerio.load(html);

  // TRIAL

  const allData: {
    title: string;
    price: string;
    ogPrice: string;
    rating: string;
    overview: Array<any>;
    description: Array<string>;
    images: Array<string>;
  } = {
    title: '',
    price: '',
    ogPrice: '',
    rating: '',
    overview: [],
    description: [],
    images: []
  };

  // get title
  allData.title = $(selectors.title).text().trim();

  return allData;
};

const closeBrowser = async (browser: Browser) => {
  await browser.close();
};

export { initPage, getWebData, closeBrowser, temporaryGetWebData };
