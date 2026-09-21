import * as XLSX from "xlsx-js-style";
import {saveAs} from "file-saver";

// Matches the live "User Wise Collection.xls" (Collection Details only) row for row. "Credit/
// Insurance" carries the space that sheet uses.
const COLUMN_HEADERS = ["#", "Cashier", "Cash", "Cr.Card", "Cheque", "Bank Transfer", "Total", "Credit/ Insurance", "Prev Collection", "UnsettledAmt"];
const TOTAL_COLS = COLUMN_HEADERS.length;

const NOTES = [
  "Net Amount (Total Amount + Credit Bill Collection Total - Refund Total ) .Collection Refund Also Included In Refund Portion",
  "Receipt Discount is included in the Adv. Settled",
  "Refund Included in Partial pay bills",
];

// A row's `data` is the [{label: value}, ...] shape CollectionTableCellCmp / SectionWiseTotal
// consume — pull out just the values, in column order.
const dataValues = (data) => (data ?? []).map((item) => Object.values(item)[0]);
const numberCell = (value) => (typeof value === "number" ? Number(value.toFixed(2)) : value);

const blankRow = () => Array(TOTAL_COLS).fill("");
const sectionLabelRow = (label) => {
  const row = blankRow();
  row[0] = label;
  return row;
};
const dataRow = (row, index) => [index + 1, row.USC_NAME, ...dataValues(row.data).map(numberCell)];
const totalRow = (label, columns) => [label, "", ...dataValues(columns).map(numberCell)];

const fileStem = (fromLabel, toLabel) => `User_Wise_Collection_Only_${fromLabel.replace(/\//g, "-")}_to_${toLabel.replace(/\//g, "-")}`;

export const exportCollectionOnlyExcel = ({summaryRows, creditBillCollectionRows, summaryTotalColumns, creditBillCollectionTotalColumns, netAmountColumns, fromLabel, toLabel}) => {
  const aoa = [];
  const merges = [];
  const pushRow = (row) => aoa.push(row) - 1;
  const mergeRow = (rowIndex, fromCol, toCol) => merges.push({s: {r: rowIndex, c: fromCol}, e: {r: rowIndex, c: toCol}});

  const groupHeaderRow = blankRow();
  groupHeaderRow[2] = "Collection Details";
  const groupHeaderRowIndex = pushRow(groupHeaderRow);
  mergeRow(groupHeaderRowIndex, 2, TOTAL_COLS - 1);

  const columnHeaderRowIndex = pushRow(COLUMN_HEADERS);

  mergeRow(pushRow(sectionLabelRow("Summary User Wise :")), 0, 4);
  summaryRows.forEach((row, index) => pushRow(dataRow(row, index)));
  mergeRow(pushRow(totalRow("Total Amount", summaryTotalColumns)), 0, 1);

  mergeRow(pushRow(sectionLabelRow("Credit Bill Collection :")), 0, 4);
  creditBillCollectionRows.forEach((row, index) => pushRow(dataRow(row, index + summaryRows.length)));
  mergeRow(pushRow(totalRow("Credit Bill Collection Total", creditBillCollectionTotalColumns)), 0, 1);

  mergeRow(pushRow(totalRow("Net Amount", netAmountColumns)), 0, 1);

  pushRow(blankRow());
  NOTES.forEach((text) => mergeRow(pushRow(sectionLabelRow(text)), 0, TOTAL_COLS - 1));

  const worksheet = XLSX.utils.aoa_to_sheet(aoa);
  worksheet["!merges"] = merges;
  const range = XLSX.utils.decode_range(worksheet["!ref"]);

  for (let R = groupHeaderRowIndex; R <= range.e.r; ++R) {
    for (let C = 0; C <= range.e.c; ++C) {
      const cell = worksheet[XLSX.utils.encode_cell({r: R, c: C})];
      if (!cell) continue;
      cell.s = {
        font: {name: "Arial", sz: 10},
        alignment: {horizontal: C >= 2 ? "right" : "left"},
        border: {top: {style: "thin"}, bottom: {style: "thin"}, left: {style: "thin"}, right: {style: "thin"}},
      };
      if (R === groupHeaderRowIndex || R === columnHeaderRowIndex) {
        cell.s.fill = {fgColor: {rgb: "94C5F7"}};
        cell.s.font.bold = true;
        cell.s.alignment.horizontal = "center";
      }
    }
  }

  worksheet["!cols"] = COLUMN_HEADERS.map((_, i) => ({wch: i === 1 ? 20 : 14}));

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "User Wise Collection");
  XLSX.writeFile(workbook, `${fileStem(fromLabel, toLabel)}.xlsx`);
};

const htmlRow = (cells, {bold = false} = {}) =>
  `<tr>${cells
    .map(
      (cell, i) =>
        `<td style="border:1px solid #999;padding:2px 6px;font-family:Arial;font-size:11px;${bold ? "font-weight:bold;" : ""}text-align:${i <= 1 ? "left" : "right"};">${cell ?? ""}</td>`,
    )
    .join("")}</tr>`;

// No docx library is installed, so this uses the HTML-with-application/msword-mimetype trick
// (same as the full report's export) — Word opens it natively.
export const exportCollectionOnlyWord = ({summaryRows, creditBillCollectionRows, summaryTotalColumns, creditBillCollectionTotalColumns, netAmountColumns, fromLabel, toLabel, hosName}) => {
  const rowsHtml = [
    htmlRow(COLUMN_HEADERS, {bold: true}),
    htmlRow(["Summary User Wise :"], {bold: true}),
    ...summaryRows.map((row, index) => htmlRow(dataRow(row, index))),
    htmlRow(totalRow("Total Amount", summaryTotalColumns), {bold: true}),
    htmlRow(["Credit Bill Collection :"], {bold: true}),
    ...creditBillCollectionRows.map((row, index) => htmlRow(dataRow(row, index + summaryRows.length))),
    htmlRow(totalRow("Credit Bill Collection Total", creditBillCollectionTotalColumns), {bold: true}),
    htmlRow(totalRow("Net Amount", netAmountColumns), {bold: true}),
  ].join("");

  const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
    <head><meta charset="utf-8"><title>User Wise Collection</title></head>
    <body>
      <h3 style="font-family:Arial;">${hosName ?? ""}</h3>
      <h3 style="font-family:Arial;">User Wise Collection From ${fromLabel} To ${toLabel}</h3>
      <table style="border-collapse:collapse;width:100%;">${rowsHtml}</table>
    </body>
  </html>`;

  const blob = new Blob(["﻿", html], {type: "application/msword"});
  saveAs(blob, `${fileStem(fromLabel, toLabel)}.doc`);
};
