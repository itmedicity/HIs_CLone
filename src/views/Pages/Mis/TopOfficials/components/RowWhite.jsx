// @ts-nocheck
import {TableCell, TableRow} from "@mui/material";
import React, {memo} from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import {formatToDecimal} from "../utils/utlils.fun";

const RowWhite = ({data, onClick, serialNum}) => {
  // const description = data?.groupName?.toLowerCase();
  const incomeGroupName = data?.subGroupName === "SubGroupTotal" ? null : data?.subGroupName;
  const serialNo = data?.subGroupName === "SubGroupTotal" ? null : serialNum;
  return (
    <TableRow key={data.subGroupName}>
      <TableCell align="right" sx={{width: "2%", textAlign: "center", fontSize: "12px"}}>
        {serialNo}
      </TableCell>
      <TableCell align="left" sx={{width: "25%", fontSize: "12px", textTransform: "capitalize"}}>
        {incomeGroupName}
      </TableCell>
      <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}>
        {data.collection}
      </TableCell>
      <TableCell align="right" sx={{width: "20%", fontSize: "12px", cursor: "pointer", textDecoration: "underline", color: "#0000EE"}} onClick={() => onClick(data)}>
        {formatToDecimal(data.netAmount)}
      </TableCell>
      <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}>
        {formatToDecimal(data.tax)}
      </TableCell>
      <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 2}}>
        {formatToDecimal(data.discount)}
      </TableCell>
      <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 1}}>
        {formatToDecimal(data.gross)}
      </TableCell>
    </TableRow>
  );
};

export default memo(RowWhite);
