import puppeteer, { Browser, Page } from "puppeteer";
import cheerio from "cheerio";
import { selectors } from "./dataSectors";

const getWebData = async (url: string) => {
  const browser: Browser = await puppeteer.launch();
  const page: Page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 800 });
  await page.goto(url, { waitUntil: "load", timeout: 30000 });

  await page.screenshot({ path: "example.png" });
  let html = await page.evaluate(() => document.body.innerHTML);

  const $ = cheerio.load(html);

  // TRIAL

  const allData = { title: "", price: "", rating: "", totalRatings: "" };

  // get title
  allData.title = $(selectors.title).text().trim();

  // get price
  allData.price = $(selectors.price).text();

  // get rating
  allData.rating = $(selectors.rating).text();

  // get totalRatings
  allData.totalRatings = $(selectors.totalRatings).text();

  await browser.close();

  return allData;
};

export default getWebData;
