import * as fs from "fs";
import { parse } from "fast-csv";
import { initPage, closeBrowser, getWebData } from "./crawler";

let allCSVData: any = [];

// function for error handling

// function to work on the data

const gatherAllCSVData = async (row: any) => {
  allCSVData.push(row);
};

// function for end
const fetchDataForEachProduct = async () => {
  console.time("Op");
  let { browser, page } = await initPage();
  console.log("Starting parsing");

  for (let i = 0; i < allCSVData.length; i++) {
    let data = await getWebData(page, allCSVData[i].URL);
    console.log(data);
  }

  console.log("Ending parsing");
  console.timeEnd("Op");
  closeBrowser(browser);
};

const readTheFile = () => {
  return new Promise((resolve, reject) => {
    // get all the data
    fs.createReadStream("Gifts.csv")
      .pipe(parse({ headers: true }))
      .on("error", (error) => reject(error))
      .on("data", gatherAllCSVData)
      .on("end", () => resolve("Done"));
  });
};

readTheFile().then((res) => {
  console.log("THE END", allCSVData.length);
  fetchDataForEachProduct();
});
