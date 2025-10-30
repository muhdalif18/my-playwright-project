const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");

// Ensure output folder exists
function ensureOutputDir() {
  const outputDir = path.join(__dirname, "../output");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }
  return outputDir;
}

function saveAsJSON(fileName, records) {
  const outputDir = ensureOutputDir();
  fs.writeFileSync(path.join(outputDir, fileName), JSON.stringify(records, null, 2));
}

function saveAsCSV(fileName, records) {
  const outputDir = ensureOutputDir();
  const csvHeader = Object.keys(records[0]).join(",") + "\n";
  const csvRows = records.map(r => Object.values(r).join(",")).join("\n");
  fs.writeFileSync(path.join(outputDir, fileName), csvHeader + csvRows);
}

function saveAsExcel(fileName, records) {
  const outputDir = ensureOutputDir();
  const worksheet = xlsx.utils.json_to_sheet(records);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  const filePath = path.join(outputDir, fileName);
  xlsx.writeFile(workbook, filePath);
}

module.exports = { saveAsJSON, saveAsCSV, saveAsExcel };
