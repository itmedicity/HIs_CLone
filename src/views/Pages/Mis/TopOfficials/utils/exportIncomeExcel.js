// utils/exportStyledExcel.js

import * as XLSX from "xlsx-js-style";
import {saveAs} from "file-saver";

export const exportStyledExcel = (data) => {
  const {procedureIncome, pharmacyIncome, ipDiscount, collectionAgainstSales, creditInsurance, counterCollection, patientType} = data;

  let rows = [];
  let merges = [];
  let rowIndex = 0;
  let serial = 1;

  const addRow = (row) => {
    rows.push(row);
    rowIndex++;
  };

  // 🔵 HEADER
  addRow(["Sl#", "Income Group", "Collection", "Net", "Tax", "Discount", "Gross"]);

  // =====================
  // PROCEDURE INCOME
  // =====================
  procedureIncome.forEach((group) => {
    addRow([null, group.groupHead]);

    merges.push({
      s: {r: rowIndex - 1, c: 1},
      e: {r: rowIndex - 1, c: 6},
    });

    group.groupData.forEach((item) => {
      if (item.subGroupName === "SubGroupTotal") return;

      addRow([serial++, item.subGroupName, "", item.netAmount, item.tax, item.discount, item.gross]);
    });

    const total = group.groupData.find((x) => x.subGroupName === "SubGroupTotal");

    addRow(["", "Sub Total", "", total?.netAmount, total?.tax, total?.discount, total?.gross]);
  });

  // =====================
  // OTHER SECTIONS
  // =====================
  addRow([]);
  addRow(["", "Sale Of Medicine"]);

  pharmacyIncome.forEach((item) => {
    addRow([serial++, "Pharmacy", "", item.netAmount, item.tax, item.discount, item.gross]);
  });

  addRow([]);
  ipDiscount.forEach((item) => {
    addRow([serial++, item.subGroupName, "", item.netAmount, "", item.discount, ""]);
  });

  addRow([]);
  collectionAgainstSales.forEach((item) => {
    addRow([item.subGroupName === "Grand Total" ? "" : serial++, item.subGroupName, item.collection, item.netAmount, item.tax, item.discount, item.gross]);
  });

  addRow([]);
  creditInsurance.forEach((item) => {
    addRow([serial++, item.subGroupName, item.collection]);
  });

  addRow([]);
  addRow(["", "Total Counter Collection", counterCollection]);

  addRow([]);
  addRow(["", "Patient Type", "Discount"]);

  patientType.forEach((item, i) => {
    addRow([i + 1 >= 3 ? "" : i + 1, item.subGroupName, item.collection]);
  });

  // =====================
  // SHEET
  // =====================
  const ws = XLSX.utils.aoa_to_sheet(rows);
  ws["!merges"] = merges;

  // =====================
  // 🎨 STYLING START
  // =====================
  const range = XLSX.utils.decode_range(ws["!ref"]);

  for (let R = range.s.r; R <= range.e.r; ++R) {
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cellRef = XLSX.utils.encode_cell({r: R, c: C});
      if (!ws[cellRef]) continue;

      // Default style
      ws[cellRef].s = {
        font: {name: "Calibri", sz: 10},
        alignment: {vertical: "center", horizontal: "right"},
      };

      // 🔵 HEADER
      if (R === 0) {
        ws[cellRef].s = {
          fill: {fgColor: {rgb: "94C5F7"}},
          font: {bold: true},
          alignment: {horizontal: "center"},
          border: borderStyle(),
        };
      }

      // 🔷 GROUP HEADER
      if (rows[R][0] === null && rows[R][1] && !rows[R][2]) {
        ws[cellRef].s = {
          fill: {fgColor: {rgb: "D9EDF7"}},
          font: {bold: true},
          alignment: {horizontal: "left"},
          border: borderStyle(),
        };
      }

      // 🩶 SUB TOTAL
      if (rows[R][1] === "Sub Total") {
        ws[cellRef].s = {
          fill: {fgColor: {rgb: "EAEAEA"}},
          font: {bold: true},
          border: borderStyle(),
        };
      }

      // 🔲 Borders for all data rows
      if (R > 0) {
        ws[cellRef].s.border = borderStyle();
      }
    }
  }

  // Column width
  ws["!cols"] = [{wch: 6}, {wch: 30}, {wch: 18}, {wch: 18}, {wch: 12}, {wch: 15}, {wch: 18}];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Income Report");

  const buffer = XLSX.write(wb, {
    bookType: "xlsx",
    type: "array",
  });

  saveAs(new Blob([buffer]), "Hospital_Income_Styled.xlsx");
};

// =====================
// BORDER STYLE
// =====================
const borderStyle = () => ({
  top: {style: "thin", color: {rgb: "000000"}},
  bottom: {style: "thin", color: {rgb: "000000"}},
  left: {style: "thin", color: {rgb: "000000"}},
  right: {style: "thin", color: {rgb: "000000"}},
});
