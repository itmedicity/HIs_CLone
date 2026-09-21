export const COLLECTION_ONLY_ADDRESS = "A Unit Of Quilon Medical Trust, Mylapore, Thattamala P.O, Kollam";

// `selectIpNumbers` picks this report's IP list out of the /admission/getIpNumber rows — the
// same tmch_status split IncomeReportsTmch.jsx uses. Tmch excludes every admitted IP patient
// (backend NOT IN); Tssh keeps tmch_status "0"; Grouped keeps tmch_status "1"; Qmt is unfiltered.
export const COLLECTION_ONLY_VARIANTS = {
  tmch: {
    hosName: "TRAVANCORE MEDICAL COLLEGE & HOSPITAL",
    filterRoute: "CollectionReportCollectionOnly",
    detailRoute: "CollectionReportCollectionOnlyDetl",
    selectIpNumbers: (rows) => rows.map((e) => e.ip_no),
  },
  tssh: {
    hosName: "TRAVANCORE SUPER SPECIALITY HOSPITAL",
    filterRoute: "CollectionReportCollectionOnlyTssh",
    detailRoute: "CollectionReportCollectionOnlyDetlTssh",
    selectIpNumbers: (rows) => rows.filter((e) => e.tmch_status === "0").map((e) => e.ip_no),
  },
  grouped: {
    hosName: "QUILON MEDICAL TRUST - (GRP)",
    filterRoute: "CollectionReportCollectionOnlyGrouped",
    detailRoute: "CollectionReportCollectionOnlyDetlGrouped",
    selectIpNumbers: (rows) => rows.filter((e) => e.tmch_status === "1").map((e) => e.ip_no),
  },
  qmt: {
    hosName: "QUILON MEDICAL TRUST",
    filterRoute: "CollectionReportCollectionOnlyQmt",
    detailRoute: "CollectionReportCollectionOnlyDetlQmt",
    selectIpNumbers: null,
  },
};
