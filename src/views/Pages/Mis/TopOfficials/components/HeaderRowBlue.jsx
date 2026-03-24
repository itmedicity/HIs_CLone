import {TableCell, TableRow} from "@mui/material";
import React from "react";

const HeaderRowBlue = () => {
  return (
    <TableRow
      sx={{
        backgroundColor: "#BBD8FF",
        height: "30px",
      }}
    >
      <TableCell align="right" sx={{width: "2%", fontWeight: "bolder", fontSize: "12px"}}></TableCell>
      <TableCell align="left" colSpan={6} sx={{fontWeight: "bolder", fontSize: "12px"}}></TableCell>
    </TableRow>
  );
};

export default HeaderRowBlue;
