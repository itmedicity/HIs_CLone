import React from "react";
import {TableCell, TableRow} from "@mui/material";
import "../../Style.css";

const SectionWiseTotal = ({SectionWiseTotalName}) => {
  return (
    <TableRow className="coll-TableBodyRow">
      <TableCell colSpan={2} className="coll-SectionTotalRow coll-TextAlignLeft">
        {SectionWiseTotalName}
      </TableCell>
      <TableCell className="coll-SectionTotalRow coll-TextAlignRight">10</TableCell>
      <TableCell className="coll-SectionTotalRow coll-TextAlignRight">85946.00</TableCell>
      <TableCell className="coll-SectionTotalRow coll-TextAlignRight">10</TableCell>
      <TableCell className="coll-SectionTotalRow coll-TextAlignRight">0</TableCell>
      <TableCell className="coll-SectionTotalRow coll-TextAlignRight">0</TableCell>
      <TableCell className="coll-SectionTotalRow coll-TextAlignRight">0</TableCell>
      <TableCell className="coll-SectionTotalRow coll-TextAlignRight">0</TableCell>
      <TableCell className="coll-SectionTotalRow coll-TextAlignRight">0</TableCell>
    </TableRow>
  );
};

export default SectionWiseTotal;
