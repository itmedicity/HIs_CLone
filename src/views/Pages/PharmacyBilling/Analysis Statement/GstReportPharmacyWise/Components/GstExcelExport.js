import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

export const GstExcelExport = async (reportData, fileName) => {
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const ws = XLSX.utils.json_to_sheet(reportData);

    XLSX.utils.sheet_add_aoa(ws, [["Pharmacy Code", "Pharmacy", "Item Code", "Item", "Bill No", "Bill Date", "CACR",
        "Quantity", "Loose", "Purcahse Rate", "MRP", "Actual MRP", "Discount", "Amount", "Tax Amount", "Tax Code", "Tax %", "Tax Description"]], { origin: "A1" });
    const wb = {
        Sheets: { data: ws },
        SheetNames: ["data"]
    };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
}
