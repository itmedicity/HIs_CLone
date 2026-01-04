// @ts-nocheck
import React, {memo, useMemo} from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import ReportHeader from "../../../Components/ReportHeader";
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow} from "@mui/material";
import MenuButton from "../Components/MenuButton";

const CreditInsurBillCollModal = ({layout, setLayout, state, data, name}) => {
  const newArray = useMemo(() => {
    const {data0, data1} = data;
    const newData = [data0, data1].filter((array) => Array.isArray(array)); // Ensure only arrays are concatenated
    return [].concat(...newData);
  }, [data]);

  const totals = useMemo(() => {
    return newArray.reduce(
      (acc, curr) => ({
        cash: acc.cash + (Number.isFinite(curr.CASH) ? curr.CASH : 0),
        cheque: acc.cheque + (Number.isFinite(curr.CHEQUE) ? curr.CHEQUE : 0),
        dd: acc.dd + (Number.isFinite(curr.DD) ? curr.DD : 0),
        card: acc.card + (Number.isFinite(curr.CARD) ? curr.CARD : 0),
        bankAmt: acc.bankAmt + (Number.isFinite(curr.BANKAMT) ? curr.BANKAMT : 0),
        totalAmount: acc.totalAmount + (Number.isFinite(curr.AMT) ? curr.AMT : 0),
      }),
      {cash: 0, cheque: 0, dd: 0, card: 0, bankAmt: 0, totalAmount: 0}
    );
  }, [newArray]);

  return (
    <Modal open={!!layout} onClose={() => setLayout(undefined)}>
      <ModalDialog aria-labelledby="layout-modal-title" aria-describedby="layout-modal-description" layout={layout} sx={{backgroundColor: "lightgrey"}}>
        <Box>
          <MenuButton layOutClose={setLayout} navigateTo={""} />
        </Box>
        <Paper
          variant="outlined"
          sx={{
            border: 1,
            borderRadius: 0,
            borderColor: "black",
            boxShadow: 5,
          }}
        >
          <ReportHeader data={state} name="Credit Collection" hosName={name} disable={true} />
          <Box
            sx={{
              overflow: "auto",
              paddingBottom: "15px",
              borderBottom: 1,
              marginBottom: 8,
              height: 600,
            }}
          >
            <TableContainer component={Box}>
              <Table padding="none" sx={{}} size="small" aria-label="a dense table">
                <TableHead
                  sx={{
                    backgroundColor: "#94C5F7",
                  }}
                >
                  <TableRow
                    sx={{
                      p: 0,
                      m: 0,
                      borderBottomColor: "black",
                      height: "30px",
                    }}
                  >
                    <TableCell padding="none" variant="body" size="small" align="right" sx={{width: "2%", fontWeight: "bolder", fontSize: "12px"}}>
                      #
                    </TableCell>
                    <TableCell padding="none" variant="body" size="small" align="left" sx={{width: "10%", fontWeight: "bolder", fontSize: "12px", pl: 2}}>
                      Receipt No
                    </TableCell>
                    <TableCell padding="none" variant="body" size="small" align="left" sx={{width: "10%", fontWeight: "bolder", fontSize: "12px"}}>
                      Cash
                    </TableCell>
                    <TableCell padding="none" variant="body" size="small" align="left" sx={{width: "10%", fontWeight: "bolder", fontSize: "12px", pr: 2}}>
                      Cheque
                    </TableCell>
                    <TableCell padding="none" variant="body" size="small" align="right" sx={{width: "10%", fontWeight: "bolder", fontSize: "12px", pr: 2}}>
                      DD
                    </TableCell>
                    <TableCell padding="none" variant="body" size="small" align="right" sx={{width: "10%", fontWeight: "bolder", fontSize: "12px", pr: 2}}>
                      Card
                    </TableCell>
                    <TableCell padding="none" variant="body" size="small" align="right" sx={{width: "10%", fontWeight: "bolder", fontSize: "12px", pr: 2}}>
                      Bank
                    </TableCell>
                    <TableCell padding="none" variant="body" size="small" align="right" sx={{width: "15%", fontWeight: "bolder", fontSize: "12px", pr: 2}}>
                      Bank Name
                    </TableCell>
                    <TableCell padding="none" variant="body" size="small" align="right" sx={{width: "15%", fontWeight: "bolder", fontSize: "12px", pr: 2}}>
                      Customer
                    </TableCell>
                    <TableCell padding="none" variant="body" size="small" align="right" sx={{width: "15%", fontWeight: "bolder", fontSize: "12px", pr: 2}}>
                      User
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {newArray?.map((e, idx) => (
                    <TableRow key={idx}>
                      <TableCell align="right" sx={{width: "2%", textAlign: "center", alignItems: "center"}}>
                        {idx + 1}
                      </TableCell>
                      <TableCell align="left" sx={{width: "10%", fontSize: "12px", textTransform: "capitalize"}}>
                        {e.BILLNO}
                      </TableCell>
                      <TableCell align="left" sx={{width: "10%", fontSize: "12px"}}>
                        {e.CASH?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                      </TableCell>
                      <TableCell align="left" sx={{width: "10%", fontSize: "12px", pr: 2}}>
                        {e.CHEQUE?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                      </TableCell>
                      <TableCell align="right" sx={{width: "10%", fontSize: "12px", pr: 2}}>
                        {e.DD?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                      </TableCell>
                      <TableCell align="right" sx={{width: "10%", fontSize: "12px", pr: 2}}>
                        {e.CARD?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                      </TableCell>
                      <TableCell align="right" sx={{width: "10%", fontSize: "12px", pr: 2}}>
                        {e.BANKAMT?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                      </TableCell>
                      <TableCell align="right" sx={{width: "15%", fontSize: "12px", pr: 2}}>
                        {e.BANK}
                      </TableCell>
                      <TableCell align="right" sx={{width: "15%", fontSize: "12px", pr: 2}}>
                        {e.CUSTOMER}
                      </TableCell>
                      <TableCell align="right" sx={{width: "15%", fontSize: "12px", pr: 2}}>
                        {e.USERNAME}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell align="right" sx={{width: "2%", textAlign: "center", alignItems: "center", fontWeight: 700}}></TableCell>
                    <TableCell align="left" sx={{width: "10%", fontSize: "12px", textTransform: "capitalize", fontWeight: 700, color: "black"}}>
                      Total
                    </TableCell>
                    <TableCell align="left" sx={{width: "10%", fontSize: "12px", fontWeight: 700, color: "black"}}>
                      {totals.CASH?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                    </TableCell>
                    <TableCell align="left" sx={{width: "10%", fontSize: "12px", pr: 2, fontWeight: 700, color: "black"}}>
                      {totals.CHEQUE?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                    </TableCell>
                    <TableCell align="right" sx={{width: "10%", fontSize: "12px", pr: 2, fontWeight: 700, color: "black"}}>
                      {totals.DD?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                    </TableCell>
                    <TableCell align="right" sx={{width: "10%", fontSize: "12px", pr: 2, fontWeight: 700, color: "black"}}>
                      {totals.CARD?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                    </TableCell>
                    <TableCell align="right" sx={{width: "10%", fontSize: "12px", pr: 2, fontWeight: 700, color: "black"}}>
                      {totals.BANKAMT?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                    </TableCell>
                    <TableCell align="right" sx={{width: "15%", fontSize: "12px", pr: 2, fontWeight: 700, color: "black"}}></TableCell>
                    <TableCell align="right" sx={{width: "15%", fontSize: "12px", pr: 2, fontWeight: 700, color: "black"}}></TableCell>
                    <TableCell align="right" sx={{width: "15%", fontSize: "12px", pr: 2, fontWeight: 700, color: "black"}}></TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Box>
        </Paper>
      </ModalDialog>
    </Modal>
  );
};

export default memo(CreditInsurBillCollModal);
