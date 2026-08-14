import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

export const GstExcelExport = async (reportData, fileName) => {
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    // Headers are derived from reportData's own field names below (via
    // json_to_sheet) rather than a hardcoded list, so they always match
    // the actual exported columns.
    const ws = XLSX.utils.json_to_sheet(reportData);

    const wb = {
        Sheets: { data: ws },
        SheetNames: ["data"]
    };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
}
