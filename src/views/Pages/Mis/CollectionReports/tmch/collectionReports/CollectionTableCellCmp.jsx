import React, {useMemo} from "react";
import {TableRow, TableCell} from "@mui/material";
import "../../Style.css";

const CollectionTableCellCmp = ({row, index}) => {
  // console.log(row);
  const {USC_NAME, US_CODE, data} = row;
  const formattedData = useMemo(() => {
    return row.data.map((item, index) => ({
      ...item,
      metricId: index,
      formaterValue: Object.values(item)[0].toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}),
    }));
  }, [row.data]);

  console.log(formattedData);
  return (
    <TableRow className="coll-TableBodyRow" key={index}>
      <TableCell className="coll-TableBodyCell coll-TextAlignRight coll-CenterdCell">{index + 1}</TableCell>
      <TableCell className="coll-TableBodyCell coll-TextAlignLeft">{USC_NAME}</TableCell>
      {formattedData.map(({metricId, formaterValue}) => {
        return (
          <TableCell key={metricId} className="coll-TableBodyCell coll-TextAlignRight">
            {formaterValue}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default CollectionTableCellCmp;
