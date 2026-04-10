const style = {cursor: "pointer", textDecoration: "underline", color: "#0000EE"};
const grandTotalStyle = {fontWeight: "bold"};

export const hospitalIncomeData = [
  {
    ProcudureIncome: [
      {
        groupHead: "Bed",
        groupData: [
          {subGroupName: "Bed", collection: null, netAmount: 6700.0, tax: 0.0, discount: 0.0, gross: 6700.0, style: "N"},
          {subGroupName: "Room", collection: null, netAmount: 331700.0, tax: 0.0, discount: 0.0, gross: 331700.0, style: "N"},
          {subGroupName: "Ns", collection: null, netAmount: 111050.0, tax: 0.0, discount: 0.0, gross: 111050.0, style: "N"},
          {subGroupName: "SubGroupTotal", collection: 0.0, netAmount: 0.0, tax: 0.0, discount: 0.0, gross: 0.0, style: "N"},
        ],
      },
      {
        groupHead: "Other",
        groupData: [
          {subGroupName: "General", collection: null, netAmount: 3500.0, tax: 0.0, discount: 0.0, gross: 350.0, style: "N"},
          {subGroupName: "Others", collection: null, netAmount: 678499.0, tax: 0.0, discount: 0.0, gross: 678499.0, style: "N"},
          {subGroupName: "SubGroupTotal", collection: 0.0, netAmount: 0.0, tax: 0.0, discount: 0.0, gross: 678849.0, style: "N"},
        ],
      },
      {
        groupHead: "Consulting",
        groupData: [
          {subGroupName: "COnsulting", collection: null, netAmount: 478160.0, tax: 0.0, discount: 0.0, gross: 478160.0, style: "N"},
          {subGroupName: "SubGroupTotal", collection: 0.0, netAmount: 478160.0, tax: 0.0, discount: 0.0, gross: 478160.0, style: "N"},
        ],
      },
      {
        groupHead: "Surgery",
        groupData: [
          {subGroupName: "Theater", collection: null, netAmount: 292500.0, tax: 0.0, discount: 0.0, gross: 292500.0, style: "N"},
          {subGroupName: "Operation", collection: null, netAmount: 211000.0, tax: 0.0, discount: 0.0, gross: 211000.0, style: "N"},
          {subGroupName: "Anaethesia", collection: null, netAmount: 107829.0, tax: 0.0, discount: 0.0, gross: 107829.0, style: "N"},
          {subGroupName: "SubGroupTotal", collection: 0.0, netAmount: 611329.0, tax: 0.0, discount: 0.0, gross: 611329.0, style: "N"},
        ],
      },
      {
        groupHead: "Cardiology",
        groupData: [
          {subGroupName: "Cardiology", collection: null, netAmount: 229715.0, tax: 0.0, discount: 0.0, gross: 229715.0, style: "N"},
          {subGroupName: "SubGroupTotal", collection: 0.0, netAmount: 229715.0, tax: 0.0, discount: 0.0, gross: 229715.0, style: "N"},
        ],
      },
      {
        groupHead: "Disposible",
        groupData: [
          {subGroupName: "Disposible", collection: null, netAmount: 39064.0, tax: 0.0, discount: 0.0, gross: 39064.0, style: "N"},
          {subGroupName: "SubGroupTotal", collection: 0.0, netAmount: 39064.0, tax: 0.0, discount: 0.0, gross: 39064.0, style: "N"},
        ],
      },
      {
        groupHead: "Icu",
        groupData: [
          {subGroupName: "Icu", collection: null, netAmount: 196000.0, tax: 0.0, discount: 0.0, gross: 196000.0, style: "N"},
          {subGroupName: "Ico Proc", collection: null, netAmount: 23600.0, tax: 0.0, discount: 0.0, gross: 23600.0, style: "N"},
          {subGroupName: "SubGroupTotal", collection: 0.0, netAmount: 219600.0, tax: 0.0, discount: 0.0, gross: 219600.0, style: "N"},
        ],
      },
      {
        groupHead: "Radiology",
        groupData: [
          {subGroupName: "Radiology", collection: null, netAmount: 288180.0, tax: 0.0, discount: 0.0, gross: 288180.0, style: "N"},
          {subGroupName: "SubGroupTotal", collection: null, netAmount: 288180.0, tax: 0.0, discount: 0.0, gross: 288180.0, style: "N"},
        ],
      },
      {
        groupHead: "Lab",
        groupData: [
          {subGroupName: "Lab", collection: null, netAmount: 607500.0, tax: 0.0, discount: 0.0, gross: 607500.0, style: "N"},
          {subGroupName: "SubGroupTotal", collection: null, netAmount: 607500.0, tax: 0.0, discount: 0.0, gross: 607500.0, style: "N"},
        ],
      },
      {
        groupHead: "Mri",
        groupData: [
          {subGroupName: "Mri", collection: null, netAmount: 16000.0, tax: 0.0, discount: 0.0, gross: 16000.0, style: "N"},
          {subGroupName: "SubGroupTotal", collection: null, netAmount: 16000.0, tax: 0.0, discount: 0.0, gross: 16000.0, style: "N"},
        ],
      },
      {
        groupHead: "Diet",
        groupData: [
          {subGroupName: "Diet", collection: null, netAmount: 38080.0, tax: 0.0, discount: 0.0, gross: 38080.0, style: "N"},
          {subGroupName: "SubGroupTotal", collection: null, netAmount: 38080.0, tax: 0.0, discount: 0.0, gross: 38080.0, style: "N"},
        ],
      },
    ],
    PharmacySales: [
      {
        groupHead: "Sale of Medicine",
        groupData: [{subGroupName: "Pharmacy Medicine Sales", collection: null, netAmount: 2268880.12, tax: 33734.64, discount: 113394.5, gross: 2416009.26, style: "N"}],
      },
    ],
    IpConsolidatedDiscountSection: [
      {subGroupName: "Ip Consolidate Discount", collection: null, netAmount: 54359.0, tax: 0, discount: 54359.0, gross: 0, style: "N"},
      {subGroupName: "Petty Cash Amount", collection: null, netAmount: 0, tax: 0, discount: 0, gross: 0, style: "N"},
      {subGroupName: "Tax Amount", collection: null, netAmount: 33734.64, tax: 0, discount: 0, gross: 0, style: "N"},
    ],
    CollectionAgainstSalesSection: [
      {subGroupName: "Collection Against Sales (A)", collection: 2538095.0, netAmount: null, tax: null, discount: null, gross: null, style: "N"},
      {subGroupName: "Advance Settled", collection: 1573014.0, netAmount: null, tax: null, discount: null, gross: null, style: "N"},
      {subGroupName: "Credit/Insurance Bill", collection: 1809208.0, netAmount: null, tax: 921.88, discount: null, gross: null, style: "U"},
      {subGroupName: "UnSettled Amount", collection: -16124, netAmount: null, tax: 0.0, discount: null, gross: null, style: "U"},
      {subGroupName: "Round Off", collection: null, netAmount: 11.13, tax: null, discount: null, gross: null, style: "N"},
      {subGroupName: "Grand Total", collection: 5904193.59, netAmount: 5904193.89, tax: 33734.64, discount: 167753.5, gross: 6071936.36, style: "B"},
    ],
    CreditInsuranceBillSection: [
      {subGroupName: "Credit/Insurance Bill Discount", collection: 2538095.0, netAmount: null, tax: null, discount: null, gross: null, style: "N"},
      {subGroupName: "Credit/Insurance WriteOff Amount", collection: 1573014.0, netAmount: null, tax: null, discount: null, gross: null, style: "N"},
      {subGroupName: "Complimentary", collection: 1809208.0, netAmount: null, tax: null, discount: null, gross: null, style: "N"},
      {subGroupName: "IP Previous Day's Discount", collection: 0.0, netAmount: null, tax: null, discount: null, gross: null, style: "N"},
      {subGroupName: "Advance Refund (B)", collection: 0.0, netAmount: null, tax: null, discount: null, gross: null, style: "N"},
      {subGroupName: "Advance Collection (C)", collection: 5904193.59, netAmount: null, tax: null, discount: null, gross: null, style: "U"},
      {subGroupName: "Credit/Insurance Bill Collection(D)", collection: 5904193.59, netAmount: null, tax: null, discount: null, gross: null, style: "U"},
      {subGroupName: "IP Previous Day's Collection(E)", collection: 5904193.59, netAmount: null, tax: null, discount: null, gross: null, style: "N"},
    ],
    CounterCollection: [{subGroupName: "Total Counter Collection( A + C + D + E - B)", collection: 4047262.0, netAmount: null, tax: null, discount: null, gross: null, style: "N"}],
    Patient_Type: [
      {
        groupHead: "Patient type",
        groupData: [
          {subGroupName: "General", collection: 168708.04, netAmount: 0, tax: 0, discount: 0, gross: 0, style: "N"},
          {subGroupName: "Other Type", collection: 453.46, netAmount: 0, tax: 0, discount: 0, gross: 0, style: "N"},
          {subGroupName: "Discount Total", collection: 168753.5, netAmount: 0, tax: 0, discount: 0, gross: 0, style: "B"},
        ],
      },
    ],
  },
];
