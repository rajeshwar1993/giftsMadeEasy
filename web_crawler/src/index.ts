import * as fs from "fs";
import { parse } from "fast-csv";
import getWebData from "./crawler";

let allCSVData: any = [];

// function for error handling

// function to work on the data

const gatherAllCSVData = async (row: any) => {
  allCSVData.push(row);
};

// function for end
const fetchDataForEachProduct = (rowcount: number) => {
  if (rowcount !== allCSVData.length) {
    console.log("All data was not stored. Exiting");
    return;
  }

  console.log(`All data gathered: ${allCSVData.length} of ${rowcount}`);

  allCSVData.forEach(async (element: any) => {
    let data = await getWebData(element.URL);
    console.log(data);
  });
};

// open csv file
const csvFile = fs.createReadStream("Gifts.csv");

// get all the data
csvFile
  .pipe(parse({ headers: true }))
  .on("error", (error) => console.error(error))
  .on("data", gatherAllCSVData)
  .on("end", fetchDataForEachProduct);

console.log("THE END");
