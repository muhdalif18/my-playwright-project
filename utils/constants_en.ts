module.exports = {
  //SUPPLIER
  SUPPLIER_EP: [
    "PERTUBUHAN KUCING KUCING BERSATU - eP-1008O000M",
    "PERSATUAN IBU BAPA DAN GURU - eP-0705M0005",
    "AMPLANG SEDAP SDN BHD - eP-1213G00EC",
    "MEE KOLOK ORI - eP-1366E000P",
    "FUJI BAKERY SUPPLIES (M) SDN. BHD. - eP-1002J0009",
  ],

  // LETTER OF ACCEPTANCE INFORMATION

  // Dropdown options
  DROPDOWN_OPTIONS: {
    PROCUREMENT_METHOD: ["Tender", "Quotation"],
    QUOTATION_TYPE: [
      "Open",
      "International",
      "Limited Tendering",
      "Manual Qt",
      "Special Item / Item in Pk 7",
      "Selective Tendering",
      "Request For Proposal",
    ],
    REASON_SPECIAL_ITEM: [
      "Medicines, Medical Equipment, Dairy Products, Reagents, Kitchen Utensils, Cardiology and Cardiothoracic Services Consumables (Special Item)",
      "PK 7.1 - Procurement of Organization Council / Government Official Events and Ceremony Reception Government Official",
      "PK 7.10 - Procurement of Government Gazette Printing",
      "PK 7.11 - Procurement of Supply Delivery for Local and Foreign Books/ Publication",
      "PK 7.12 - Procurement of Local Newspapers and Megazines",
      "PK 7.13 - Procurement of Air Condition Maintenance/ Repair Service Which Does Not Involve Complex Electric Work",
      "PK 7.14 - Procurement of Broadcast Advertising Through Media",
      "PK 7.15 - Procurement Via Direct Negotiation and Others",
      "PK 7.2 - Procurement of Services Training By Package",
      "PK 7.3 -Training Participation Organized By Government Agency Or Private Company",
      "PK 7.4 - Procurement of Accomodation, Food and Beverage for Administrative Members and Public Officers Implementing Official Tasks",
      "PK 7.5 - Procurement of Food and Beverage for Internal Meetings",
      "PK 7.6 - Procurement Related ICT and Internet Network",
      "PK 7.7 - Procurement of Vehicles",
      "PK 7.8 - Procurement of Vehicle Maintenance and Repair Services",
      "PK 7.9 - Procurement of Fuels in Peninsular Malaysia",
      "Procurement of Printing Service Government Gazzette (PK2)"
    ],
    CATEGORY_TYPE: ["Supply Of Goods", "Service"],
    PROCUREMENT_CATEGORY: [
      "Cooked Food/Beverages",
      "Cooking Food Raw Material",
      "Laboratory Equipment",
      "Medicines and Chemicals",
      "Ict",
      "Security",
      "Cleaning Service",
      "Services",
      "Service Movers",
      "Office Equipment",
      "Hire Purchase (Operating Lease)",
      "Training",
      "Uniform",
      "Others",
    ],
    FULFILLMENT_TYPE: [
      "One-Off",
      /* "Non-Periodic (Schedule)",
      "Non-Periodic (As And When)", */
      "Periodic (Schedule)",
      "Periodic (As And When)",
    ],
  },

  // Letter Titles
  LETTER_TITLES: [
    "Supply and Installation of System",
    "Maintenance Services",
    "Supply of Equipment",
    "Repair Works",
    "Cleaning Services",
    "Supply of Chemicals",
    "Security System",
    "IT Support Services",
    "Supply of Office Furniture",
    "Landscaping Works",
    "Consultancy Services",
    "Supply of Medicines",
    "Ventilation System",
    "Electrical Works",
    "Security Services",
  ],

  // Reference Number Prefixes
  NO_PREFIXES: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",

  // Price Offer
  PRICE_RANGES: {
    MIN: 20000,
    MAX: 300000,
  },

  //CONTRACT DETAILS

  CONTRACT_TYPE: ["Ministry", "Central"],

  CONTRACT_DURATION: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],

  REQUIRED_AGREEMENT: ["Yes", "No"],

  TYPE_OF_GOODS: ["Local", "Imported"],

  ZONE: ["Yes", "No"],

  ZONE_COVERAGE: ["State", "District"],

  ZONE_NAME_STATE: [
    "NEGERI SEMBILAN",
    "PAHANG",
    "PERAK",
    "PERLIS",
    "PULAU PINANG",
    "SABAH",
    "SARAWAK",
    "SELANGOR",
    "TERENGGANU",
    "WILAYAH PERSEKUTUAN KUALA LUMPUR",
    "WILAYAH PERSEKUTUAN LABUAN",
    "WILAYAH PERSEKUTUAN PUTRAJAYA",
  ],

  //PRODUCT

  ITEM_ALPHABET: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ITEM_NUMBERS: "0123456789",

  PRO_UOM: ["J02-Pack of 6 Rolls", "J00 - roll", "J20 - syringe", "J40 - unit"],

  PRICE_TYPE01: ["Normal Standard", "Tier Standard"],
  PRICE_TYPE02: ["Zonal Standard", "Zonal Tier Standard"],

  PRO_QUANTITY: {
    MIN: 1,
    MAX: 10,
  },

  //SERVICE

  SERVICE_ALPHABET: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  SERVICE_NUMBERS: "0123456789",

  MEASURE_UNIT: ["AU-Activity Unit"],

  FREQ_UNIT: {
    MIN: 1,
    MAX: 10,
  },

  SERVICE_QUANTITY: {
    MIN: 1,
    MAX: 10,
  },

  SERVICE_PRICE: {
    MIN: 1,
    MAX: 10,
  },
};
