import * as XLSX from "xlsx-js-style";
import {saveAs} from "file-saver";

export const exportStyledExcel = (data) => {
  const {procedureIncome = [], pharmacyIncome = [], ipDiscount = [], collectionAgainstSales = [], creditInsurance = [], counterCollection = 0, patientType = []} = data;

  let rows = [];
  let merges = [];
  let rowIndex = 0;
  let serial = 1;

  const addRow = (row) => {
    rows.push(row);
    rowIndex++;
  };

  // ==================================
  // MAIN HEADER
  // ==================================
  addRow(["Sl#", "Income Group", "Collection", "Net", "Tax", "Discount", "Gross"]);

  // ==================================
  // PROCEDURE INCOME
  // ==================================
  procedureIncome.forEach((group) => {
    addRow(["", toTitleCase(group.groupHead), "", "", "", "", ""]);

    merges.push({
      s: {r: rowIndex - 1, c: 1},
      e: {r: rowIndex - 1, c: 6},
    });

    group.groupData.forEach((item) => {
      if (item.subGroupName === "SubGroupTotal") return;

      addRow([serial++, toTitleCase(item.subGroupName), "", underlinedValue(item.netAmount || 0), item.tax || 0, item.discount || 0, item.gross || 0]);
    });

    const total = group.groupData.find((x) => x.subGroupName === "SubGroupTotal");

    addRow(["", "", "", total?.netAmount || 0, total?.tax || 0, total?.discount || 0, total?.gross || 0]);
  });

  // ==================================
  // PHARMACY
  // ==================================
  // addRow(["", "", "", "", "", "", ""]);
  addRow([null, "Sale Of Medicine", "", "", "", "", ""]);

  pharmacyIncome.forEach((item) => {
    addRow([
      serial++,
      "Pharmacy Medicine Sale",
      "",
      styledNumber(item.netAmount, {
        underline: true,
        color: "1D4ED8",
        bold: true,
      }),
      item.tax || 0,
      item.discount || 0,
      item.gross || 0,
    ]);
  });

  // ==================================
  // IP DISCOUNT
  // ==================================
  addRow(["", "", "", "", "", "", ""]);

  ipDiscount.forEach((item) => {
    addRow([serial++, item.subGroupName, "", item.netAmount || 0, "", item.discount || 0, ""]);
  });

  // ==================================
  // COLLECTION AGAINST SALES
  // ==================================
  addRow(["", "", "", "", "", "", ""]);

  collectionAgainstSales.forEach((item) => {
    const isHighlight = item.subGroupName === "Round Off";
    const isUnderLine = item.subGroupName === "Credit/Insurance Bill" || item.subGroupName === "UnSettled Amount";
    addRow([
      item.subGroupName === "Grand Total" ? "" : serial++,
      isHighlight
        ? styledText(item.subGroupName, {
            color: "FF0000",
            bold: true,
          })
        : item.subGroupName,
      isUnderLine ? styledNumber(item.collection || 0, {underline: true, color: "1D4ED8", bold: true}) : item.collection || 0,
      item.netAmount || 0,
      item.tax || 0,
      item.discount || 0,
      item.gross || 0,
    ]);
  });

  // ==================================
  // CREDIT INSURANCE
  // ==================================
  addRow(["", "", "", "", "", "", ""]);

  creditInsurance.forEach((item) => {
    const isHighlight = item.subGroupName === "	Complimentary";
    const isUnderLine = item.subGroupName === "Advance Collection (C)" || item.subGroupName === "Credit/Insurance Bill Collection(D)";
    addRow([
      serial++,
      isHighlight ? styledText(item.subGroupName, {color: "FF0000", bold: true}) : item.subGroupName,
      isUnderLine
        ? styledNumber(item.collection || 0, {
            underline: true,
            color: "1D4ED8",
            bold: true,
          })
        : item.collection || 0,
      "",
      "",
      "",
      "",
    ]);
  });

  // ==================================
  // COUNTER COLLECTION
  // ==================================
  addRow(["", "", "", "", "", "", ""]);
  addRow(["", "Total Counter Collection", counterCollection, "", "", "", ""]);

  // ==================================
  // PATIENT TYPE
  // ==================================
  addRow(["", "", "", "", "", "", ""]);
  addRow(["", "Patient Type", "Discount", "", "", "", ""]);

  patientType.forEach((item, i) => {
    addRow([i + 1 >= 3 ? "" : i + 1, item.subGroupName, item.collection || 0, "", "", "", ""]);
  });

  // ==================================
  // CREATE SHEET
  // ==================================
  const ws = XLSX.utils.aoa_to_sheet(rows);
  ws["!merges"] = merges;
  // ws["!rows"] = rows.map(() => ({hpx: 28}));

  ws["!rows"] = rows.map((row, index) => {
    if (index === 0) return {hpx: 30}; // main header
    // Blank separator rows
    if (row.every((cell) => cell === "")) return {hpx: 28};
    if (row[0] === "" && row[1]) return {hpx: 28}; // section/group rows
    return {hpx: 16}; // normal rows
  });

  const range = XLSX.utils.decode_range(ws["!ref"]);

  // ==================================
  // APPLY STYLES
  // ==================================
  for (let R = range.s.r; R <= range.e.r; ++R) {
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cellRef = XLSX.utils.encode_cell({r: R, c: C});

      if (!ws[cellRef]) continue;

      const row = rows[R];

      ws[cellRef].s = {
        ...getDefaultStyle(C),
        ...(ws[cellRef].s || {}),
      };
      // Main Header
      if (R === 0) {
        ws[cellRef].s = getHeaderStyle();
      }

      // Blue separator rows
      if (row.every((cell) => cell === "")) {
        ws[cellRef].s = getBlueSeparatorStyle();
      }

      // Group Header
      // if (row[0] === null && row[1] && !row[2]) {
      //   ws[cellRef].s = getGroupHeaderStyle();
      // }
      if (row[0] === "" && row[1] && row.slice(2).every((cell) => cell === "")) {
        ws[cellRef].s = getGroupHeaderStyle();
      }

      // Patient Type Header
      if (row[1] === "Patient Type") {
        ws[cellRef].s = getPatientTypeHeaderStyle();
      }

      // Sub Total
      if (row[1] === "" && !row.every((cell) => cell === "")) {
        ws[cellRef].s = getSubTotalStyle(C);
      }

      if (row[1] === "Grand Total") {
        ws[cellRef].s = {
          ...getSubTotalStyle(C),
          font: {
            bold: true,
            name: "Calibri",
            sz: 11,
          },
        };
      }

      // number formatting
      if (C >= 2 && R > 0) {
        ws[cellRef].z = "#,##0.00";
      }
    }
  }

  // ==================================
  // COLUMN WIDTH
  // ==================================
  ws["!cols"] = [{wch: 6}, {wch: 35}, {wch: 18}, {wch: 18}, {wch: 14}, {wch: 16}, {wch: 18}];

  // ==================================
  // EXPORT
  // ==================================
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Hospital Collection View");

  const buffer = XLSX.write(wb, {
    bookType: "xlsx",
    type: "array",
  });

  saveAs(new Blob([buffer]), "Hospital Collection View.xlsx");
};

// ==================================
// STYLES
// ==================================
const borderStyle = () => ({
  top: {style: "thin", color: {rgb: "FFFFFF"}},
  bottom: {style: "thin", color: {rgb: "FFFFFF"}},
});

const getDefaultStyle = (column) => ({
  font: {
    name: "Calibri",
    sz: 11,
  },
  fill: {
    fgColor: {rgb: "FFFFFF"},
  },
  alignment: {
    vertical: "center",
    horizontal: column === 1 ? "left" : "right",
  },
  border: borderStyle(),
});

const getHeaderStyle = () => ({
  font: {
    bold: true,
    name: "Calibri",
    sz: 11,
  },
  fill: {
    fgColor: {rgb: "94C5F7"},
  },
  alignment: {
    horizontal: "center",
    vertical: "center",
  },
  border: borderStyle(),
});

const getGroupHeaderStyle = () => ({
  font: {
    bold: true,
    name: "Calibri",
    sz: 11,
  },
  fill: {
    fgColor: {rgb: "BBD8FF"},
    bgColor: {rgb: "BBD8FF"},
  },
  alignment: {
    horizontal: "left",
    vertical: "center",
  },
  border: borderStyle(),
});

const getSubTotalStyle = (column) => ({
  font: {
    bold: true,
    name: "Calibri",
    sz: 11,
  },
  fill: {
    fgColor: {rgb: "FFFFFF"},
  },
  alignment: {
    horizontal: column === 1 ? "left" : "right",
    vertical: "center",
  },
  border: borderStyle(),
});

const getBlueSeparatorStyle = () => ({
  fill: {
    fgColor: {rgb: "BBD8FF"},
  },
  border: borderStyle(),
});

const getPatientTypeHeaderStyle = () => ({
  font: {
    bold: true,
    name: "Calibri",
    sz: 11,
  },
  fill: {
    fgColor: {rgb: "94C5F7"},
  },
  alignment: {
    horizontal: "left",
    vertical: "center",
  },
  border: borderStyle(),
});

const toTitleCase = (text = "") => text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());

const underlinedValue = (value) => ({
  v: value || 0,
  t: "n",
  s: {
    font: {
      underline: true,
      color: {rgb: "1D4ED8"},
      bold: true,
      name: "Calibri",
      sz: 11,
    },
  },
});

const styledNumber = (value, {underline = false, color = null, bold = false} = {}) => ({
  v: value || 0,
  t: "n",
  s: {
    font: {
      name: "Calibri",
      sz: 11,
      underline,
      bold,
      ...(color ? {color: {rgb: color}} : {}),
    },
  },
});

const styledText = (value, {color = null, bold = false} = {}) => ({
  v: value || "",
  t: "s",
  s: {
    font: {
      name: "Calibri",
      sz: 11,
      bold,
      ...(color ? {color: {rgb: color}} : {}),
    },
  },
});
