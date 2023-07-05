

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

export const ExcelExportGroup = async (preview, fileName) => {
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const ws = XLSX.utils.json_to_sheet(preview);

    XLSX.utils.sheet_add_aoa(ws, [["Sl.No", "Group", "Active", "Password Expiry Days"]], { origin: "A1" });
    const wb = {
        Sheets: { data: ws },
        SheetNames: ["data"]
    };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
}
