import { fa } from "@faker-js/faker";
const { faker } = require("@faker-js/faker");
const {
  SUPPLIER_EP,
  DROPDOWN_OPTIONS,
  LETTER_TITLES,
  NO_PREFIXES,
  PRICE_RANGES,
  CONTRACT_TYPE,
  CONTRACT_DURATION,
  REQUIRED_AGREEMENT,
  TYPE_OF_GOODS,
  ZONE,
  ZONE_COVERAGE,
  ZONE_NAME_STATE,
  PRO_UOM,
  PRICE_TYPE01,
  PRICE_TYPE02,
  PRO_QUANTITY,
  MEASURE_UNIT,
  FREQ_UNIT,
  SERVICE_QUANTITY,
  SERVICE_PRICE,
} = require("./constants_en");

// Generate random prefix for No Rujukan.
function getRandomPrefix(length = 2) {
  let prefix = "";
  for (let i = 0; i < length; i++) {
    prefix += NO_PREFIXES.charAt(
      Math.floor(Math.random() * NO_PREFIXES.length)
    );
  }
  return prefix;
}

function getRandomContractEffectiveDate() {
  const currentDate = new Date();

  const randomDate = Math.floor(Math.random() * 365);
  const effectiveDate = new Date(currentDate);
  effectiveDate.setDate(currentDate.getDate() + randomDate);
  const day = String(effectiveDate.getDate()).padStart(2, "0");
  const month = String(effectiveDate.getMonth() + 1).padStart(2, "0");
  const year = effectiveDate.getFullYear();

  return `${day}/${month}/${year}`;
}

function generateRecord() {
  //Object kaedah perolehan
  const kaedahPerolehan = faker.helpers.arrayElement(
    DROPDOWN_OPTIONS.PROCUREMENT_METHOD
  );

  //Set tawaran harga based on kaedah perolehan
  let tawaranHargaSST;
  if (kaedahPerolehan === "Quotation") {
    tawaranHargaSST = parseFloat(
      faker.number
        .float({
          min: 20000,
          max: 300000,
        })
        .toFixed(2)
    );
  }
  if (kaedahPerolehan === "Tender") {
    tawaranHargaSST = parseFloat(
      faker.number
        .float({
          min: 300000,
          max: 1000000,
        })
        .toFixed(2)
    );
  } else {
    tawaranHargaSST = parseFloat(
      faker.number
        .float({
          min: PRICE_RANGES.MIN,
          max: PRICE_RANGES.MAX,
          precision: 0.01,
        })
        .toFixed(2)
    );
  }

  const serviceValue = faker.number.int({
    min: Math.max(SERVICE_QUANTITY.MIN, SERVICE_PRICE.MIN),
    max: Math.min(SERVICE_QUANTITY.MAX, SERVICE_PRICE.MAX),
  });

   const supplier = faker.helpers.arrayElement(SUPPLIER_EP);
  const [supplier_name, supplier_ep] = supplier.split(" - ");

  // Object record
  const record = {
    supplier,
    supplier_name,
    supplier_ep,
    tajukSurat: faker.helpers.arrayElement(LETTER_TITLES),
    kaedahPerolehan,
    jenisTender: faker.helpers.arrayElement(DROPDOWN_OPTIONS.QUOTATION_TYPE),
    sebabSpecialItem: "",
    kategoriPerolehan: faker.helpers.arrayElement(
      DROPDOWN_OPTIONS.CATEGORY_TYPE
    ),
    noRujukanFail: `${getRandomPrefix(2)}/${faker.date
      .future()
      .getFullYear()}/${faker.string.alphanumeric(3).toUpperCase()}`,
    kaedahPerolehan2: faker.helpers.arrayElement(
      DROPDOWN_OPTIONS.PROCUREMENT_CATEGORY
    ),
    tawaranHargaSST, // ambil dari condition atas
    jenisPemenuhan: faker.helpers.arrayElement(
      DROPDOWN_OPTIONS.FULFILLMENT_TYPE
    ),
    jenisKontrak: faker.helpers.arrayElement(CONTRACT_TYPE),
    tempohKontrak: faker.helpers.arrayElement(CONTRACT_DURATION),
    tarikhKuatkuasaKontrak: getRandomContractEffectiveDate(),
    perjanjianDiperlukan: faker.helpers.arrayElement(REQUIRED_AGREEMENT),
    jenisBarang: faker.helpers.arrayElement(TYPE_OF_GOODS),
    zon: faker.helpers.arrayElement(ZONE),
    liputanZon: "",
    zonID: "",
    zoneName: "",
    //Products Details
    productSpec: faker.commerce.productDescription(),
    productUOM: faker.helpers.arrayElement(PRO_UOM),
    jenisHargaProduk: "",
    productQty: faker.helpers.arrayElement(PRO_QUANTITY),

    //Service
    serviceSpec: faker.commerce.productDescription(),
    serviceOUM: faker.helpers.arrayElement(MEASURE_UNIT),
    freqperUOM: faker.number.int({ min: FREQ_UNIT.MIN, max: FREQ_UNIT.MAX }),
    serviceQty: serviceValue,
    servicePrice: serviceValue,
  };

  if (record.jenisTender === "Special Item / Item in Pk 7") {
    record.sebabSpecialItem = faker.helpers.arrayElement(
      DROPDOWN_OPTIONS.REASON_SPECIAL_ITEM
    );
  }

  if (record.jenisKontrak === "Central") {
    record.jenisPemenuhan = "Periodic (As And When)";
  }

  const periodicTypes = ["Periodic (As And When)", "Periodic (Schedule)"];

  if (periodicTypes.includes(record.jenisPemenuhan)) {
    if (record.tempohKontrak <= 4) {
      record.tempohKontrak = 5;
    }
  }

  // condition tambahan untuk zon
  if (record.zon === "Yes") {
    record.liputanZon = faker.helpers.arrayElement(ZONE_COVERAGE);
    record.zonID = "ZON" + faker.string.numeric(5);
    record.zoneName = faker.helpers.arrayElement(ZONE_NAME_STATE);
    record.jenisHargaProduk = faker.helpers.arrayElement(PRICE_TYPE02);
  }

  if (record.zon === "No") {
    record.jenisHargaProduk = faker.helpers.arrayElement(PRICE_TYPE01);
  }

  return record;
}

function generateRecords(count) {
  return Array.from({ length: count }, () => generateRecord());
}

module.exports = { generateRecord, generateRecords };
