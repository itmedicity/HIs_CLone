import React, {useMemo} from "react";
import {Box, Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody} from "@mui/material";
import moment from "moment";
import {Navigate, useSearchParams} from "react-router-dom";
import ReportHeaderDesignTwo from "../../../Components/ReportHeaderDesignTwo";
import SectionWiseTotal from "../CollectionReports/tmch/collectionReports/SectionWiseTotal";
import SectionHeadName from "../CollectionReports/tmch/collectionReports/SectionHeadName";
import CollectionTableCellCmp from "../CollectionReports/tmch/collectionReports/CollectionTableCellCmp";
import MenuButton from "../Components/MenuButton";
import "../CollectionReports/Style.css";
import {useCollectionOnlySummary} from "../../../../Hooks/useCollectionOnlySummary";
import {COLLECTION_ONLY_ADDRESS, COLLECTION_ONLY_VARIANTS, collectionOnlySessionKeys} from "./collectionOnlyVariants";
import {exportCollectionOnlyExcel, exportCollectionOnlyWord} from "./exportCollectionOnly";

const tableHeadRowArray = [
  {name: "#", className: "coll-TableHeaderCell"},
  {name: "Cashier", className: "coll-TableHeaderCell coll-TextAlignLeft"},
  {name: "Cash", className: "coll-TableHeaderCell coll-TextAlignRight"},
  {name: "Cr.Card", className: "coll-TableHeaderCell coll-TextAlignRight"},
  {name: "Cheque", className: "coll-TableHeaderCell coll-TextAlignRight"},
  {name: "Bank Transfer", className: "coll-TableHeaderCell coll-TextAlignRight"},
  {name: "Total", className: "coll-TableHeaderCell coll-TextAlignRight"},
  {name: "Credit/Insurance", className: "coll-TableHeaderCell coll-TextAlignRight"},
  {name: "Prev Collection", className: "coll-TableHeaderCell coll-TextAlignRight"},
  {name: "UnsettledAmt", className: "coll-TableHeaderCell coll-TextAlignRight"},
];
const COLUMN_COUNT = tableHeadRowArray.length;

const readSession = (key) => {
  try {
    const raw = sessionStorage.getItem(key);
    return raw === null ? null : JSON.parse(raw);
  } catch (error) {
    return null;
  }
};

const CollectionOnlyReport = ({config, variant, state}) => {
  const fromDate = useMemo(() => new Date(state.from), [state.from]);
  const toDate = useMemo(() => new Date(state.to), [state.to]);

  const {
    summaryRows,
    creditBillCollectionRows,
    summaryTotalColumns,
    creditBillCollectionTotalColumns,
    netAmountColumns,
    isLoading,
    isSuccess,
    hasError,
    errorMessage,
  } = useCollectionOnlySummary({variant, fromDate, toDate, selectedUserCodes: state.selectedUserCodes, ipNumbers: state.ipNumbers});

  const exportPayload = {
    summaryRows,
    creditBillCollectionRows,
    summaryTotalColumns,
    creditBillCollectionTotalColumns,
    netAmountColumns,
    fromLabel: moment(fromDate).format("DD-MMM-YYYY"),
    toLabel: moment(toDate).format("DD-MMM-YYYY"),
    hosName: config.hosName,
  };

  return (
    <Box flex={1} sx={{backgroundColor: "lightgray", p: "1%"}}>
      <MenuButton navigateTo={""} onExportExcel={() => exportCollectionOnlyExcel(exportPayload)} onExportWord={() => exportCollectionOnlyWord(exportPayload)} />
      <Paper square sx={{borderColor: "black", border: 1}}>
        <ReportHeaderDesignTwo
          name="User Wise Collection"
          data={{from: moment(fromDate).format("DD/MM/YYYY HH:mm:ss"), to: moment(toDate).format("DD/MM/YYYY HH:mm:ss")}}
          hosName={config.hosName}
          address={COLLECTION_ONLY_ADDRESS}
          disable={false}
        />
        <Box sx={{overflow: "auto", padding: "15px"}}>
          <TableContainer component={Box}>
            <Table padding="none" sx={{}} size="small" aria-label="a dense table">
              <TableHead sx={{backgroundColor: "#94C5F7"}}>
                <TableRow className="coll-TableHeaderRow">
                  <TableCell className="coll-TableHeaderCell" padding="none" variant="body" size="small" align="right"></TableCell>
                  <TableCell className="coll-TableHeaderCell" padding="none" variant="body" size="small" align="left"></TableCell>
                  <TableCell className="coll-TableHeaderCell" colSpan={COLUMN_COUNT - 2} padding="none" variant="body" size="small" align="right">
                    Collection Details
                  </TableCell>
                </TableRow>

                <TableRow>
                  {tableHeadRowArray.map((item, index) => (
                    <TableCell key={`Row-${index}`} padding="none" variant="body" size="small" className={item.className}>
                      {item.name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading && (
                  <TableRow className="coll-TableBodyRow">
                    <TableCell colSpan={COLUMN_COUNT} className="coll-TableBodyCell coll-TextAlignLeft" sx={{padding: "10px"}}>
                      Loading collection report…
                    </TableCell>
                  </TableRow>
                )}
                {hasError && (
                  <TableRow className="coll-TableBodyRow">
                    <TableCell colSpan={COLUMN_COUNT} className="coll-TableBodyCell coll-TextAlignLeft" sx={{padding: "10px", color: "#c62828"}}>
                      {errorMessage || "Failed to load the collection report."}
                    </TableCell>
                  </TableRow>
                )}
                <SectionHeadName SectionHeadName={"Summary User Wise :"} />
                {isSuccess && summaryRows.map((row, index) => <CollectionTableCellCmp key={`Summary-${row.US_CODE ?? index}`} row={row} index={index} />)}
                <SectionWiseTotal SectionWiseTotalName="Total Amount" data={summaryTotalColumns} />

                <SectionHeadName SectionHeadName={"Credit Bill Collection :"} />
                {isSuccess &&
                  creditBillCollectionRows.map((row, index) => (
                    <CollectionTableCellCmp key={`Credit-${row.US_CODE ?? index}`} row={row} index={index + summaryRows.length} />
                  ))}
                <SectionWiseTotal SectionWiseTotalName="Credit Bill Collection Total" data={creditBillCollectionTotalColumns} />

                <SectionWiseTotal SectionWiseTotalName="Net Amount" data={netAmountColumns} />

                <TableRow className="coll-TableBodyRow">
                  <TableCell colSpan={COLUMN_COUNT} className="coll-SectionTotalRow coll-TextAlignLeft">
                    .
                  </TableCell>
                </TableRow>
                {[
                  "Net Amount (Total Amount + Credit Bill Collection Total - Refund Total ) .Collection Refund Also Included In Refund Portion",
                  "Receipt Discount is included in the Adv. Settled",
                  "Refund Included in Partial pay bills",
                ].map((text) => (
                  <TableRow className="coll-TableBodyRow" key={text}>
                    <TableCell colSpan={COLUMN_COUNT} className="coll-SectionTotalRow coll-TextAlignLeft coll-LargeFont">
                      {text}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
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

// Opened in its own window by the filter page: dates come from the URL, the cashier selection
// and IP list from sessionStorage (which survives a refresh of this window). If any of it is
// missing (e.g. a pasted URL) go back to the filter rather than guess — a missing IP list would
// silently show the wrong hospital slice.
const CollectionOnlyDetailPage = ({variant}) => {
  const [searchParams] = useSearchParams();
  const config = COLLECTION_ONLY_VARIANTS[variant];
  const keys = collectionOnlySessionKeys(variant);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const ipNumbers = useMemo(() => readSession(keys.ips), [keys.ips]);
  const selectedUserCodes = useMemo(() => readSession(keys.users) ?? undefined, [keys.users]);
  const state = useMemo(() => ({from, to, selectedUserCodes, ipNumbers: ipNumbers ?? []}), [from, to, selectedUserCodes, ipNumbers]);
  if (!from || !to || (config.selectIpNumbers && ipNumbers === null)) return <Navigate to={`/Menu/${config.filterRoute}`} replace />;
  return <CollectionOnlyReport config={config} variant={variant} state={state} />;
};

export default CollectionOnlyDetailPage;
