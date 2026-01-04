import React, {useEffect, useMemo} from "react";
import {Box, Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody} from "@mui/material";
import ReportHeaderDesignTwo from "../../../../../Components/ReportHeaderDesignTwo";
import SectionWiseTotal from "../collectionReports/SectionWiseTotal";
import SectionHeadName from "../collectionReports/SectionHeadName";
import CollectionTableCellCmp from "../collectionReports/CollectionTableCellCmp";
import MenuButton from "../../../Components/MenuButton";
import "../../Style.css";
import {axiosinstance} from "../../../../../../controllers/AxiosConfig";

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

const CollectionReportsCollOnlyDetl = () => {
  useEffect(() => {
    // document.title = "Collection Report Collection Only Details";
    const getData = async () => {
      //fetch data logic here
      const data = await axiosinstance.get("/collectionOnlyQmt/getUnsettledAmountUserWise");
      console.log("Fetched data:", data);
    };
    try {
      getData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  const emptyRow = useMemo(() => Array.from({length: 11}, (_, i) => i + 1), []);
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
                  <TableCell className="coll-TableHeaderCell" colSpan={8} padding="none" variant="body" size="small" align="right">
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
                <CollectionTableCellCmp />
                <SectionWiseTotal SectionWiseTotalName="Refund Total" />
                {/* Net Amount   */}
                <SectionWiseTotal SectionWiseTotalName="Net Amount" />
                <SectionWiseTotal SectionWiseTotalName="Round Off" />

                <TableRow className="coll-TableBodyRow">
                  <TableCell colSpan={0} className="coll-SectionTotalRow coll-TextAlignLeft">
                    .
                  </TableCell>
                </TableRow>
                {/* Message Row Starts Here */}
                <TableRow className="coll-TableBodyRow">
                  <TableCell colSpan={12} className="coll-SectionTotalRow coll-TextAlignLeft coll-LargeFont">
                    Net Amount (Total Amount + Credit Bill Collection Total - Refund Total ) .Collection Refund Also Included In Refund Portion
                  </TableCell>
                </TableRow>
                <TableRow className="coll-TableBodyRow">
                  <TableCell colSpan={12} className="coll-SectionTotalRow coll-TextAlignLeft coll-LargeFont">
                    Receipt Discount is included in the Adv. Settled
                  </TableCell>
                </TableRow>
                <TableRow className="coll-TableBodyRow">
                  <TableCell colSpan={12} className="coll-SectionTotalRow coll-TextAlignLeft coll-LargeFont">
                    Refund Included in Partial pay bills
                  </TableCell>
                </TableRow>
              </TableBody>
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

export default CollectionReportsCollOnlyDetl;
