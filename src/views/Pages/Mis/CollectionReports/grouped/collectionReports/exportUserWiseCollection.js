import * as XLSX from "xlsx-js-style";
import {saveAs} from "file-saver";

// Matches the on-screen table header (see tableHeadRowArray in CollectionGroupedDetlReports.jsx),
// except "Credit/ Insurance" carries the space the legacy "User Wise Collection.xls" design uses
// — three columns are legitimately labelled "Total" on screen (Revenue Total, Total After Adv,
// Collection Total), which is fine for spreadsheet cell text but can't be object keys, hence
// building rows as plain arrays rather than XLSX.utils.json_to_sheet.
const COLUMN_HEADERS = [
  "#",
  "Cashier",
  "IP#",
  "IP Amt",
  "OP#",
  "OP Amt",
  "POS#",
  "POS Amt",
  "Total",
  "Adv#",
  "Adv Colld",
  "Adv Settld",
  "Total",
  "Cash",
  "Cr.Card",
  "Cheque",
  "Credit/ Insurance",
  "Bank Transfer",
  "Total",
  "Prev Collection",
  "UnsettledAmt",
];

const TOTAL_COLS = COLUMN_HEADERS.length;

// A row's `data` is the same [{label: value}, ...] shape CollectionTableCellCmp and
// SectionWiseTotal already consume — pull out just the values, in column order.
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

/**
 * Builds and downloads the full three-section User Wise Collection report as an .xlsx file,
 * laid out to match the legacy "User Wise Collection.xls" design row for row: the merged
 * "Revenue Details"/"Collection Details" header band, the column headers, then Summary User
 * Wise / Credit bill Collection / Refund (each with its section label and total row), the
 * Fully/Partial Refund Bills count rows, Net Amount, Round Off, the Revenue And Collection
 * Variation line, and the three footer notes.
 */
export const exportUserWiseCollectionExcel = ({
  summaryRows,
  creditBillCollectionRows,
  refundRows,
  summaryTotalColumns,
  creditBillCollectionTotalColumns,
  refundTotalColumns,
  netAmountColumns,
  roundOffColumns,
  revenueCollectionVariation,
  fromLabel,
  toLabel,
}) => {
  const aoa = [];
  const merges = [];
  const pushRow = (row) => aoa.push(row) - 1;
  const mergeRow = (rowIndex, fromCol, toCol) => merges.push({s: {r: rowIndex, c: fromCol}, e: {r: rowIndex, c: toCol}});

  const groupHeaderRow = blankRow();
  groupHeaderRow[2] = "Revenue Details";
  groupHeaderRow[13] = "Collection Details";
  const groupHeaderRowIndex = pushRow(groupHeaderRow);
  mergeRow(groupHeaderRowIndex, 2, 12);
  mergeRow(groupHeaderRowIndex, 13, 20);

  const columnHeaderRowIndex = pushRow(COLUMN_HEADERS);

  mergeRow(pushRow(sectionLabelRow("Summary User Wise :")), 0, 4);
  summaryRows.forEach((row, index) => pushRow(dataRow(row, index)));
  mergeRow(pushRow(totalRow("Total Amount", summaryTotalColumns)), 0, 1);

  mergeRow(pushRow(sectionLabelRow("Credit Bill Collection :")), 0, 4);
  creditBillCollectionRows.forEach((row, index) => pushRow(dataRow(row, index + summaryRows.length)));
  mergeRow(pushRow(totalRow("Credit Bill Collection Total", creditBillCollectionTotalColumns)), 0, 1);

  mergeRow(pushRow(sectionLabelRow("Refund :")), 0, 4);
  refundRows.forEach((row, index) => pushRow(dataRow(row, index + summaryRows.length + creditBillCollectionRows.length)));
  mergeRow(pushRow(totalRow("Refund Total", refundTotalColumns)), 0, 1);

  // Fully/Partial Refund Bills counts have no backing field anywhere upstream (not in
  // useUserWiseCollectionSummary.js or the API response) — these are zero-filled placeholder
  // rows matching the design's row shape until that data exists.
  const refundBillRowsSoFar = summaryRows.length + creditBillCollectionRows.length + refundRows.length;
  pushRow([refundBillRowsSoFar + 1, "Fully Refund Bills", ...Array(TOTAL_COLS - 2).fill(0)]);
  pushRow([refundBillRowsSoFar + 2, "Partial Refund Bills", ...Array(TOTAL_COLS - 2).fill(0)]);

  mergeRow(pushRow(totalRow("Net Amount", netAmountColumns)), 0, 1);
  mergeRow(pushRow(totalRow("Round Off", roundOffColumns)), 0, 1);

  const variationRow = blankRow();
  variationRow[0] = "Revenue And Collection Variation";
  variationRow[18] = numberCell(revenueCollectionVariation);
  mergeRow(pushRow(variationRow), 0, 11);

  pushRow(blankRow());

  [
    "Net Amount (Total Amount + Credit Bill Collection Total - Refund Total ) .Collection Refund Also Included In Refund Portion",
    "Receipt Discount is included in the Adv. Settled",
    "Refund Included in Partial pay bills",
  ].forEach((text) => mergeRow(pushRow(sectionLabelRow(text)), 0, 13));

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

  worksheet["!cols"] = COLUMN_HEADERS.map((_, i) => ({wch: i === 1 ? 20 : 12}));

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "User Wise Collection");
  XLSX.writeFile(workbook, `User_Wise_Collection_${fromLabel.replace(/\//g, "-")}_to_${toLabel.replace(/\//g, "-")}.xlsx`);
};

const htmlRow = (cells, {bold = false} = {}) =>
  `<tr>${cells
    .map(
      (cell, i) =>
        `<td style="border:1px solid #999;padding:2px 6px;font-family:Arial;font-size:11px;${bold ? "font-weight:bold;" : ""}text-align:${
          i <= 1 ? "left" : "right"
        };">${cell ?? ""}</td>`,
    )
    .join("")}</tr>`;

/**
 * Same three-section report as exportUserWiseCollectionExcel, saved as a Word-compatible .doc
 * file. No docx library is installed in this project, so this uses the standard HTML-with-
 * application/msword-mimetype trick — Word opens it natively, and it needs no new dependency.
 */
export const exportUserWiseCollectionWord = ({
  summaryRows,
  creditBillCollectionRows,
  refundRows,
  summaryTotalColumns,
  creditBillCollectionTotalColumns,
  refundTotalColumns,
  netAmountColumns,
  roundOffColumns,
  fromLabel,
  toLabel,
}) => {
  const rowsHtml = [
    htmlRow(COLUMN_HEADERS, {bold: true}),
    htmlRow(["Summary User Wise"], {bold: true}),
    ...summaryRows.map((row, index) => htmlRow(dataRow(row, index))),
    htmlRow(totalRow("Total Amount", summaryTotalColumns), {bold: true}),
    htmlRow(["Credit bill Collection :"], {bold: true}),
    ...creditBillCollectionRows.map((row, index) => htmlRow(dataRow(row, index + summaryRows.length))),
    htmlRow(totalRow("Credit Bill Collection Total", creditBillCollectionTotalColumns), {bold: true}),
    htmlRow(["Refund :"], {bold: true}),
    ...refundRows.map((row, index) => htmlRow(dataRow(row, index + summaryRows.length + creditBillCollectionRows.length))),
    htmlRow(totalRow("Refund Total", refundTotalColumns), {bold: true}),
    htmlRow(totalRow("Net Amount", netAmountColumns), {bold: true}),
    htmlRow(totalRow("Round Off", roundOffColumns), {bold: true}),
  ].join("");

  const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
    <head><meta charset="utf-8"><title>User Wise Collection</title></head>
    <body>
      <h3 style="font-family:Arial;">User Wise Collection From ${fromLabel} To ${toLabel}</h3>
      <table style="border-collapse:collapse;width:100%;">${rowsHtml}</table>
    </body>
  </html>`;

  const blob = new Blob(["﻿", html], {type: "application/msword"});
  saveAs(blob, `User_Wise_Collection_${fromLabel.replace(/\//g, "-")}_to_${toLabel.replace(/\//g, "-")}.doc`);
};
