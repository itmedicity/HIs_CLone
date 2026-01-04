import React, {useMemo} from "react";
import {TableRow, TableCell} from "@mui/material";

const SectionHeadName = ({SectionHeadName}) => {
  const summaryColumns = useMemo(() => Array.from({length: 1}, (_, i) => i + 1), []);
  return (
    <TableRow className="coll-TableBodyRow">
      <TableCell className="coll-TableBodyCell  coll-TextAlignLeft" sx={{fontWeight: "bold"}} colSpan={10}>
        {SectionHeadName}
      </TableCell>
      {/* {summaryColumns.map((index) => (
        <TableCell key={`Cell-Number-${index}`} className="coll-TableBodyCell"></TableCell>
      ))} */}
    </TableRow>
  );
};

export default SectionHeadName;
