// utils/exportIncomePDF.js

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportIncomePDF = (data) => {
  const doc = new jsPDF("p", "mm", "a4");

  const {procedureIncome, pharmacyIncome} = data;

  let rows = [];
  let serial = 1;

  // Header Title
  doc.setFontSize(14);
  doc.text("Hospital Income Report", 14, 15);

  // =====================
  // BUILD TABLE DATA
  // =====================
  procedureIncome.forEach((group) => {
    rows.push(["", group.groupHead, "", "", "", "", ""]);

    group.groupData.forEach((item) => {
      if (item.subGroupName === "SubGroupTotal") return;

      rows.push([serial++, item.subGroupName, "", item.netAmount, item.tax, item.discount, item.gross]);
    });

    const total = group.groupData.find((x) => x.subGroupName === "SubGroupTotal");

    rows.push(["", "Sub Total", "", total?.netAmount, total?.tax, total?.discount, total?.gross]);
  });

  // =====================
  // TABLE
  // =====================
  autoTable(doc, {
    startY: 20,
    head: [["Sl#", "Income Group", "Collection", "Net", "Tax", "Discount", "Gross"]],
    body: rows,
    styles: {
      fontSize: 8,
    },
    headStyles: {
      fillColor: [148, 197, 247], // 🔵 blue header like UI
      textColor: 0,
    },
    didParseCell: (data) => {
      // Group header styling
      if (data.row.raw[0] === "" && data.column.index === 1) {
        data.cell.styles.fillColor = [220, 230, 250];
        data.cell.styles.fontStyle = "bold";
      }
    },
  });

  doc.save("Hospital_Income_Report.pdf");
};
