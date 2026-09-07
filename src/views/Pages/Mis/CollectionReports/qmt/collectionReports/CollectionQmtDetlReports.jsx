import React, {useMemo} from "react";
import {Box, Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TableFooter} from "@mui/material";
import moment from "moment";
import {useSearchParams} from "react-router-dom";
import MenuButton from "../../../Components/MenuButton";
import ReportHeaderDesignTwo from "../../../../../Components/ReportHeaderDesignTwo";
import "../../Style.css";
import CollectionTableCellCmp from "./CollectionTableCellCmp";
import SectionWiseTotal from "./SectionWiseTotal";
import SectionHeadName from "./SectionHeadName";
import {useUserWiseCollectionSummaryQmt} from "../../../../../../Hooks/useUserWiseCollectionSummaryQmt";
import {exportUserWiseCollectionExcel, exportUserWiseCollectionWord} from "./exportUserWiseCollection";

const tableHeadRowArray = [
  {name: "#", className: "coll-TableHeaderCell"},
  {name: "Cashier", className: "coll-TableHeaderCell coll-TextAlignLeft"},
  {name: "IP#", className: "coll-TableHeaderCell coll-TextAlignRight"},
  {name: "IP Amt", className: "coll-TableHeaderCell coll-TextAlignRight"},
  {name: "OP#", className: "coll-TableHeaderCell coll-TextAlignRight"},
  {name: "OP Amt", className: "coll-TableHeaderCell coll-TextAlignRight"},
  {name: "POS#", className: "coll-TableHeaderCell coll-TextAlignRight"},
  {name: "POS Amt", className: "coll-TableHeaderCell coll-TextAlignRight"},
  {name: "Total", className: "coll-TableHeaderCell coll-TextAlignRight"},
  {name: "Adv#", className: "coll-TableHeaderCell coll-TextAlignRight"},
  {name: "Adv Colld", className: "coll-TableHeaderCell coll-TextAlignRight"},
  {name: "Adv Settld", className: "coll-TableHeaderCell coll-TextAlignRight"},
  {name: "Total", className: "coll-TableHeaderCell coll-TextAlignRight"},
  {name: "Cash", className: "coll-TableHeaderCell coll-TextAlignRight"},
  {name: "Cr.Card", className: "coll-TableHeaderCell coll-TextAlignRight"},
  {name: "Cheque", className: "coll-TableHeaderCell coll-TextAlignRight"},
  {name: "Credit/Insurance", className: "coll-TableHeaderCell coll-TextAlignRight"},
  {name: "Bank Transfer", className: "coll-TableHeaderCell coll-TextAlignRight"},
  {name: "Total", className: "coll-TableHeaderCell coll-TextAlignRight"},
  {name: "Prev Collection", className: "coll-TableHeaderCell coll-TextAlignRight"},
  {name: "UnsettledAmt", className: "coll-TableHeaderCell coll-TextAlignRight"},
];

const CollectionQmtDetlReports = () => {
  const emptyRow = useMemo(() => Array.from({length: 21}, (_, i) => i + 1), []);

  const [searchParams] = useSearchParams();
  const fromDate = searchParams.get("from") ? new Date(searchParams.get("from")) : moment().startOf("day").toDate();
  const toDate = searchParams.get("to") ? new Date(searchParams.get("to")) : moment().endOf("day").toDate();
  const selectedUserCodes = useMemo(() => {
    try {
      const raw = sessionStorage.getItem("CollectionReportQmtSelectedUserCodes");
      return raw ? JSON.parse(raw) : undefined;
    } catch (error) {
      return undefined;
    }
  }, []);

  const {
    summaryRows,
    creditBillCollectionRows,
    refundRows,
    summaryTotalColumns,
    creditBillCollectionTotalColumns,
    refundTotalColumns,
    netAmountColumns,
    roundOffColumns,
    revenueCollectionVariation,
    isLoading,
    isSuccess,
    hasError,
    errorMessage,
  } = useUserWiseCollectionSummaryQmt(fromDate, toDate, selectedUserCodes);

  const exportPayload = {
    summaryRows,
    creditBillCollectionRows,
    refundRows,
    summaryTotalColumns,
    creditBillCollectionTotalColumns,
    refundTotalColumns,
    netAmountColumns,
    roundOffColumns,
    revenueCollectionVariation,
    fromLabel: moment(fromDate).format("DD-MMM-YYYY"),
    toLabel: moment(toDate).format("DD-MMM-YYYY"),
  };

  return (
    <Box flex={1} sx={{backgroundColor: "lightgray", p: "12px"}}>
      <MenuButton
        navigateTo={""}
        onExportExcel={() => exportUserWiseCollectionExcel(exportPayload)}
        onExportWord={() => exportUserWiseCollectionWord(exportPayload)}
      />
      <Paper square sx={{borderColor: "black", border: 1}}>
        <ReportHeaderDesignTwo
          name="User Wise Collection"
          data={{from: moment(fromDate).format("DD/MM/YYYY HH:mm:ss"), to: moment(toDate).format("DD/MM/YYYY HH:mm:ss")}}
          hosName="QUILON MEDICAL TRUST"
          address={"A Unit Of Quilon Medical Trust, Mylapore, Thattamala P.O, Kollam"}
          disable={false}
        />
        <Box
          sx={{
            overflow: "auto",
            padding: "15px",
          }}
        >
          <TableContainer component={Box}>
            <Table padding="none" sx={{}} size="small" aria-label="a dense table">
              <TableHead sx={{backgroundColor: "#94C5F7"}}>
                <TableRow className="coll-TableHeaderRow">
                  <TableCell className="coll-TableHeaderCell" padding="none" variant="body" size="small" align="right"></TableCell>
                  <TableCell className="coll-TableHeaderCell" padding="none" variant="body" size="small" align="left"></TableCell>
                  <TableCell className="coll-TableHeaderCell" colSpan={11} padding="none" variant="body" size="small" align="right">
                    Revenue Details
                  </TableCell>
                  <TableCell className="coll-TableHeaderCell" colSpan={11} padding="none" variant="body" size="small" align="right">
                    Collection Details
                  </TableCell>
                </TableRow>

                <TableRow>
                  {tableHeadRowArray.map((item, index) => (
                    <TableCell key={`Row-${index}`} padding="none" variant="body" size="small" sx={{width: item.width}} className={item.className}>
                      {item.name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading && (
                  <TableRow className="coll-TableBodyRow">
                    <TableCell colSpan={21} className="coll-TableBodyCell coll-TextAlignLeft" sx={{padding: "10px"}}>
                      Loading collection report…
                    </TableCell>
                  </TableRow>
                )}
                {hasError && (
                  <TableRow className="coll-TableBodyRow">
                    <TableCell colSpan={21} className="coll-TableBodyCell coll-TextAlignLeft" sx={{padding: "10px", color: "#c62828"}}>
                      {errorMessage || "Failed to load the collection report."}
                    </TableCell>
                  </TableRow>
                )}
                <SectionHeadName SectionHeadName={"Summary User Wise"} />
                {/* Summary User Wise Table rows */}
                {isSuccess && summaryRows.map((row, index) => <CollectionTableCellCmp key={`Summary-${row.US_CODE ?? index}`} row={row} index={index} />)}
                <SectionWiseTotal SectionWiseTotalName="Total Amount" data={summaryTotalColumns} />
                {/* Credit bill Collection Heads */}
                <SectionHeadName SectionHeadName={"Credit bill Collection :"} />
                {isSuccess &&
                  creditBillCollectionRows.map((row, index) => (
                    <CollectionTableCellCmp key={`Credit-${row.US_CODE ?? index}`} row={row} index={index + summaryRows.length} />
                  ))}
                <SectionWiseTotal SectionWiseTotalName="Credit Bill Collection Total" data={creditBillCollectionTotalColumns} />
                {/* Refunds Heads */}
                <SectionHeadName SectionHeadName={"Refund :"} />
                {isSuccess &&
                  refundRows.map((row, index) => (
                    <CollectionTableCellCmp
                      key={`Refund-${row.US_CODE ?? index}`}
                      row={row}
                      index={index + summaryRows.length + creditBillCollectionRows.length}
                    />
                  ))}
                <SectionWiseTotal SectionWiseTotalName="Refund Total" data={refundTotalColumns} />
                {/* Net Amount   */}
                <SectionWiseTotal SectionWiseTotalName="Net Amount" data={netAmountColumns} />
                <SectionWiseTotal SectionWiseTotalName="Round Off" data={roundOffColumns} />

                <TableRow className="coll-TableBodyRow">
                  <TableCell colSpan={12} className="coll-SectionTotalRow coll-TextAlignLeft">
                    Revenue And Collection Variation
                  </TableCell>
                  {/* Lines up under Total After Adv, Cash, Cr.Card, Cheque, Credit/Insurance,
                      Bank Transfer (empty), then the variation value under the collection
                      Total column, then Prev Collection / UnsettledAmt (empty) — 9 cells to
                      fill out the remaining width after the colSpan=12 label. */}
                  <TableCell className="coll-SectionTotalRow coll-TextAlignRight"></TableCell>
                  <TableCell className="coll-SectionTotalRow coll-TextAlignRight"></TableCell>
                  <TableCell className="coll-SectionTotalRow coll-TextAlignRight"></TableCell>
                  <TableCell className="coll-SectionTotalRow coll-TextAlignRight"></TableCell>
                  <TableCell className="coll-SectionTotalRow coll-TextAlignRight"></TableCell>
                  <TableCell className="coll-SectionTotalRow coll-TextAlignRight"></TableCell>
                  <TableCell className="coll-SectionTotalRow coll-TextAlignRight">
                    {revenueCollectionVariation.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                  </TableCell>
                  <TableCell className="coll-SectionTotalRow coll-TextAlignRight"></TableCell>
                  <TableCell className="coll-SectionTotalRow coll-TextAlignRight"></TableCell>
                </TableRow>
                <TableRow className="coll-TableBodyRow">
                  {emptyRow.map((item, index) => (
                    <TableCell key={`Row-${index}`} className="coll-SectionTotalRow coll-TextAlignRight" sx={{height: "14px"}}></TableCell>
                  ))}
                </TableRow>
              </TableBody>
              {/* Message Row Starts Here */}
              <TableFooter>
                <TableRow className="coll-TableBodyRow">
                  <TableCell colSpan={12} className="coll-SectionTotalRow coll-TextAlignLeft coll-LargeFont">
                    Net Amount (Total Amount + Credit Bill Collection Total - Refund Total ) .Collection Refund Also Included In Refund Portion
                  </TableCell>
                  <TableCell className="coll-SectionTotalRow coll-TextAlignRight"></TableCell>
                  <TableCell className="coll-SectionTotalRow coll-TextAlignRight"></TableCell>
                  <TableCell className="coll-SectionTotalRow coll-TextAlignRight"></TableCell>
                  <TableCell className="coll-SectionTotalRow coll-TextAlignRight"></TableCell>
                  <TableCell className="coll-SectionTotalRow coll-TextAlignRight"></TableCell>
                  <TableCell className="coll-SectionTotalRow coll-TextAlignRight"></TableCell>
                  <TableCell className="coll-SectionTotalRow coll-TextAlignRight"></TableCell>
                </TableRow>
                <TableRow className="coll-TableBodyRow">
                  <TableCell colSpan={12} className="coll-SectionTotalRow coll-TextAlignLeft coll-LargeFont">
                    Receipt Discount is included in the Adv. Settled
                  </TableCell>
                  <TableCell className="coll-SectionTotalRow coll-TextAlignRight"></TableCell>
                  <TableCell className="coll-SectionTotalRow coll-TextAlignRight"></TableCell>
                  <TableCell className="coll-SectionTotalRow coll-TextAlignRight"></TableCell>
                  <TableCell className="coll-SectionTotalRow coll-TextAlignRight"></TableCell>
                  <TableCell className="coll-SectionTotalRow coll-TextAlignRight"></TableCell>
                  <TableCell className="coll-SectionTotalRow coll-TextAlignRight"></TableCell>
                  <TableCell className="coll-SectionTotalRow coll-TextAlignRight"></TableCell>
                </TableRow>
                <TableRow className="coll-TableBodyRow">
                  <TableCell colSpan={12} className="coll-SectionTotalRow coll-TextAlignLeft coll-LargeFont">
                    Refund Included in Partial pay bills
                  </TableCell>
                  <TableCell className="coll-SectionTotalRow coll-TextAlignRight"></TableCell>
                  <TableCell className="coll-SectionTotalRow coll-TextAlignRight"></TableCell>
                  <TableCell className="coll-SectionTotalRow coll-TextAlignRight"></TableCell>
                  <TableCell className="coll-SectionTotalRow coll-TextAlignRight"></TableCell>
                  <TableCell className="coll-SectionTotalRow coll-TextAlignRight"></TableCell>
                  <TableCell className="coll-SectionTotalRow coll-TextAlignRight"></TableCell>
                  <TableCell className="coll-SectionTotalRow coll-TextAlignRight"></TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Box>
        {/* Footer */}
        <Box className="coll-Footer">
          <Box className="coll-FooterLeftTxt">Date/Time :</Box>
          <Box className="coll-FooterCenterTxt">User : Accounts</Box>
          <Box className="coll-FooterRightTxt">
            Powered by
            <Box component="span" className="coll-FooterCmpName">
              Ellider
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default CollectionQmtDetlReports;
