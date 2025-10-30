const { test } = require("@playwright/test");
const { generateRecords } = require("../../utils/dloagenerator");
const { saveAsJSON, saveAsCSV, saveAsExcel } = require("../../utils/fileHelper");
const fs = require("fs");
const path = require("path");

test("Generate DLOA Test Data", async ({}, testInfo) => {
  const numRecords = 30; //Change number record to generate
  const records = generateRecords(numRecords);

  const outputDir = path.join(__dirname, "../output");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  function getFileName(baseName, ext) {
    const now = new Date();
    const dateStr = now.toISOString().split("T")[0]; // YYYY-MM-DD
    const files = fs
      .readdirSync(outputDir)
      .filter(
        (f) => f.startsWith(`${baseName}_${dateStr}`) && f.endsWith(`.${ext}`)
      );

    const counter = String(files.length + 1).padStart(2, "0");
    return `${baseName}_${dateStr}_${counter}.${ext}`;
  }

  const jsonFile = getFileName("dloa_data", "json"); //automation
  const csvFile = getFileName("dloa_data", "csv");
  const excelFile = getFileName("dloa_data", "xlsx"); //manual

  saveAsJSON(jsonFile, records);
  saveAsCSV(csvFile, records);
  saveAsExcel(excelFile, records);

  console.log(
    ` ${numRecords} records generated:\n   /output/${jsonFile}\n   /output/${csvFile}\n   /output/${excelFile}`
  );
});
