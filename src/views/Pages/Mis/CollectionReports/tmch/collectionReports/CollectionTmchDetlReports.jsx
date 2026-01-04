import React, {useMemo} from "react";
import {Box, Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody} from "@mui/material";
import MenuButton from "../../../Components/MenuButton";
import ReportHeaderDesignTwo from "../../../../../Components/ReportHeaderDesignTwo";
import "../../Style.css";
import CollectionTableCellCmp from "./CollectionTableCellCmp";
import SectionWiseTotal from "./SectionWiseTotal";
import SectionHeadName from "./SectionHeadName";

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

const CollectionTmchDetlReports = () => {
  const emptyRow = useMemo(() => Array.from({length: 21}, (_, i) => i + 1), []);
  return (
    <Box flex={1} sx={{backgroundColor: "lightgray", p: "1%"}}>
      <MenuButton navigateTo={"CollectionReportTmch"} />
      <Paper square sx={{borderColor: "black", border: 1}}>
        <ReportHeaderDesignTwo
          name="User Wise Collection"
          data={{from: "", to: ""}}
          hosName="TRAVANCORE MEDICAL COLLEGE & HOSPITAL"
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
                <SectionHeadName SectionHeadName={"Summary User Wise"} />
                {/* Summary User Wise Table rows */}
                <CollectionTableCellCmp />
                <SectionWiseTotal SectionWiseTotalName="Total Amount" />
                {/* Credit bill Collection Heads */}
                <SectionHeadName SectionHeadName={"Credit bill Collection :"} />
                <SectionWiseTotal SectionWiseTotalName="Credit Bill Collection Total" />
                {/* Refunds Heads */}
                <SectionHeadName SectionHeadName={"Refund :"} />
                <SectionWiseTotal SectionWiseTotalName="Refund Total" />
                {/* Net Amount   */}
                <SectionWiseTotal SectionWiseTotalName="Net Amount" />
                <SectionWiseTotal SectionWiseTotalName="Round Off" />

                <TableRow className="coll-TableBodyRow">
                  <TableCell colSpan={12} className="coll-SectionTotalRow coll-TextAlignLeft">
                    Revenue And Collection Variation
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
                  {emptyRow.map((item, index) => (
                    <TableCell key={`Row-${index}`} className="coll-SectionTotalRow coll-TextAlignRight" sx={{height: "14px"}}></TableCell>
                  ))}
                </TableRow>
              </TableBody>
              {/* Message Row Starts Here */}
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
              {/* Message Row Starts Here */}
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

export default CollectionTmchDetlReports;
