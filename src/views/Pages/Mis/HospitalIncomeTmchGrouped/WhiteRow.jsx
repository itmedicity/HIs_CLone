// @ts-nocheck
import {TableCell, TableRow} from "@mui/material";
import React, {memo, useMemo} from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const WhiteRow = ({data, onClick}) => {
  const dataSet = useMemo(() => data, [data]);
  const description = useMemo(() => data?.groupName?.toLowerCase(), [data]);
  return (
    <TableRow key={dataSet.groupName}>
      <TableCell align="right" sx={{width: "2%", textAlign: "center", alignItems: "center"}}>
        <ArrowRightIcon sx={{display: "flex", fontSize: 15}} />
      </TableCell>
      <TableCell align="left" sx={{width: "25%", fontSize: "12px", textTransform: "capitalize"}}>
        {description}
      </TableCell>
      <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}></TableCell>
      <TableCell align="right" sx={{width: "20%", fontSize: "12px", cursor: "pointer", textDecoration: "underline", color: "#0000EE"}} onClick={() => onClick(dataSet)}>
        {dataSet?.groupNet?.toLocaleString("en-US", {minimumFractionDigits: 2})}
      </TableCell>
      <TableCell align="right" sx={{width: "20%", fontSize: "12px"}}>
        {dataSet?.groupTax?.toLocaleString("en-US", {minimumFractionDigits: 2})}
      </TableCell>
      <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 2}}>
        {dataSet?.groupDiscnt?.toLocaleString("en-US", {minimumFractionDigits: 2})}
      </TableCell>
      <TableCell align="right" sx={{width: "20%", fontSize: "12px", pr: 1}}>
        {dataSet?.groupGross?.toLocaleString("en-US", {minimumFractionDigits: 2})}
      </TableCell>
    </TableRow>
  );
};

export default memo(WhiteRow);
