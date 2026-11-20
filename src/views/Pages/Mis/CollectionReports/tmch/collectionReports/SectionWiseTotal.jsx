import React, {useMemo} from "react";
import {TableCell, TableRow} from "@mui/material";
import "../../Style.css";

// `data` is the same 19-entry {label: value} column array CollectionTableCellCmp consumes —
// one totals row lines up under the same columns as the section's data rows.
const SectionWiseTotal = ({SectionWiseTotalName, data}) => {
  const formattedData = useMemo(() => {
    if (!data) return [];
    return data.map((item, index) => ({
      metricId: index,
      formaterValue: Object.values(item)[0].toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}),
    }));
  }, [data]);

  return (
    <TableRow className="coll-TableBodyRow">
      <TableCell colSpan={2} className="coll-SectionTotalRow coll-TextAlignLeft">
        {SectionWiseTotalName}
      </TableCell>
      {formattedData.map(({metricId, formaterValue}) => (
        <TableCell key={metricId} className="coll-SectionTotalRow coll-TextAlignRight">
          {formaterValue}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default SectionWiseTotal;
