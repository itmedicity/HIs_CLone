// The report opens in its own window (like the full Collection Reports): dates travel on the URL,
// the cashier selection and IP list through sessionStorage, which the popup inherits a copy of.
export const collectionOnlySessionKeys = (variant) => ({
  users: `CollectionOnlySelectedUserCodes-${variant}`,
  ips: `CollectionOnlyIpNumbers-${variant}`,
});
export const COLLECTION_ONLY_POPUP_FEATURES = "toolbar=no,scrollbars=yes,resizable=yes,top=0,left=100,right=300,bottom=0";

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
