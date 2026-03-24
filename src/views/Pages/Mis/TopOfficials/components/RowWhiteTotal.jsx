import {TableCell, TableRow} from "@mui/material";
import React, {memo} from "react";
import {formatToDecimal} from "../utils/utlils.fun";

const RowWhiteTotal = ({data = []}) => {
  // Filter and remove the SubGroupTotal from the array
  const rows = data.filter((item) => item.subGroupName !== "SubGroupTotal");
  //  Calculate totals
  const netAmount = rows.reduce((sum, item) => sum + (item.netAmount || 0), 0);
  const taxAmount = rows.reduce((sum, item) => sum + (item.tax || 0), 0);
  const discountAmt = rows.reduce((sum, item) => sum + (item.discount || 0), 0);
  const grossAmount = rows.reduce((sum, item) => sum + (item.gross || 0), 0);

  return (
    <TableRow>
      <TableCell align="right" sx={{width: "2%", textAlign: "center"}}></TableCell>
      <TableCell align="left" sx={{width: "25%", fontSize: "12px"}}></TableCell>
      {/* Collection */}
      <TableCell align="right" sx={{width: "20%", fontSize: "12px", fontWeight: "bolder"}}>
        {formatToDecimal(0)}
      </TableCell>
      {/* Net  */}
      <TableCell align="right" sx={{width: "20%", fontSize: "12px", fontWeight: "bolder"}}>
        {formatToDecimal(netAmount)}
      </TableCell>
      {/* Tax */}
      <TableCell align="right" sx={{width: "20%", fontSize: "12px", fontWeight: "bolder"}}>
        {formatToDecimal(taxAmount)}
      </TableCell>
      {/* Discount */}
      <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 2, fontWeight: "bolder"}}>
        {formatToDecimal(discountAmt)}
      </TableCell>
      {/* Gross */}
      <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 1, fontWeight: "bolder"}}>
        {formatToDecimal(grossAmount)}
      </TableCell>
    </TableRow>
  );
};

export default memo(RowWhiteTotal);
