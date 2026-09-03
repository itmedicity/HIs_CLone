import * as XLSX from "xlsx-js-style";
import {saveAs} from "file-saver";

// Matches the on-screen table header exactly (see tableHeadRowArray in
// CollectionTmchDetlReports.jsx) — three columns are legitimately labelled "Total" on screen
// (Revenue Total, Total After Adv, Collection Total), which is fine for spreadsheet cell text
// but can't be object keys, hence building rows as plain arrays rather than XLSX.utils.json_to_sheet.
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
  "Credit/Insurance",
  "Bank Transfer",
  "Total",
  "Prev Collection",
  "UnsettledAmt",
];

// A row's `data` is the same [{label: value}, ...] shape CollectionTableCellCmp and
// SectionWiseTotal already consume — pull out just the values, in column order.
const dataValues = (data) => (data ?? []).map((item) => Object.values(item)[0]);

const numberCell = (value) => (typeof value === "number" ? Number(value.toFixed(2)) : value);

const sectionLabelRow = (label) => [label];
const dataRow = (row, index) => [index + 1, row.USC_NAME, ...dataValues(row.data).map(numberCell)];
const totalRow = (label, columns) => [label, "", ...dataValues(columns).map(numberCell)];

/**
 * Builds and downloads the full three-section User Wise Collection report as an .xlsx file,
 * mirroring the on-screen table row for row (Summary User Wise, Credit bill Collection, Refund,
 * plus the Total Amount / Credit Bill Collection Total / Refund Total / Net Amount / Round Off
 * footer rows).
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
  const aoa = [
    [`User Wise Collection From ${fromLabel} To ${toLabel}`],
    [],
    COLUMN_HEADERS,
    sectionLabelRow("Summary User Wise"),
    ...summaryRows.map((row, index) => dataRow(row, index)),
    totalRow("Total Amount", summaryTotalColumns),
    sectionLabelRow("Credit bill Collection :"),
    ...creditBillCollectionRows.map((row, index) => dataRow(row, index + summaryRows.length)),
    totalRow("Credit Bill Collection Total", creditBillCollectionTotalColumns),
    sectionLabelRow("Refund :"),
    ...refundRows.map((row, index) => dataRow(row, index + summaryRows.length + creditBillCollectionRows.length)),
    totalRow("Refund Total", refundTotalColumns),
    totalRow("Net Amount", netAmountColumns),
    totalRow("Round Off", roundOffColumns),
    ["Revenue And Collection Variation", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", numberCell(revenueCollectionVariation)],
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(aoa);
  const headerRowIndex = 2;
  const range = XLSX.utils.decode_range(worksheet["!ref"]);

  for (let R = headerRowIndex; R <= range.e.r; ++R) {
    for (let C = 0; C <= range.e.c; ++C) {
      const cell = worksheet[XLSX.utils.encode_cell({r: R, c: C})];
      if (!cell) continue;

      cell.s = {
        font: {name: "Arial", sz: 10},
        alignment: {horizontal: C >= 2 ? "right" : "left"},
        border: {top: {style: "thin"}, bottom: {style: "thin"}, left: {style: "thin"}, right: {style: "thin"}},
      };

      if (R === headerRowIndex) {
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
