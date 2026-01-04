import React from "react";
import {TableRow, TableCell} from "@mui/material";
import "../../Style.css";

const CollectionTableCellCmp = () => {
  return (
    <TableRow className="coll-TableBodyRow">
      <TableCell className="coll-TableBodyCell coll-TextAlignRight coll-CenterdCell">1</TableCell>
      <TableCell className="coll-TableBodyCell coll-TextAlignLeft">Accounts</TableCell>
      <TableCell className="coll-TableBodyCell coll-TextAlignRight">10</TableCell>
      <TableCell className="coll-TableBodyCell coll-TextAlignRight">00000.00</TableCell>
      <TableCell className="coll-TableBodyCell coll-TextAlignRight">10</TableCell>
      <TableCell className="coll-TableBodyCell coll-TextAlignRight">0</TableCell>
      <TableCell className="coll-TableBodyCell coll-TextAlignRight">0</TableCell>
      <TableCell className="coll-TableBodyCell coll-TextAlignRight">0</TableCell>
      <TableCell className="coll-TableBodyCell coll-TextAlignRight">0</TableCell>
      <TableCell className="coll-TableBodyCell coll-TextAlignRight">0</TableCell>
    </TableRow>
  );
};

export default CollectionTableCellCmp;
