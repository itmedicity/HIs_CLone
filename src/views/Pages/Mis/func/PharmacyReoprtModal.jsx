// @ts-nocheck
import React, {memo, useMemo} from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow} from "@mui/material";
import {format} from "date-fns";
import ReportHeader from "../../../Components/ReportHeader";
import MenuButton from "../Components/MenuButton";

const PharmacyReoprtModal = ({layout, setLayout, state, data, name}) => {
  const {pharma1, pharma2, pharma3, pharma4} = data;

  // Memorise the Valus
  const anyHasData = useMemo(() => {
    return [pharma1, pharma2, pharma3, pharma4].some((arr) => Array.isArray(arr) && arr.length > 0);
  }, [pharma1, pharma2, pharma3, pharma4]);

  const totalAmountOne = useMemo(() => {
    return pharma1?.reduce((accumulator, currentValue) => accumulator + currentValue.AMT, 0) || 0;
  }, [pharma1]);

  const totalAmounTwo = useMemo(() => {
    return pharma4?.reduce((accumulator, currentValue) => accumulator + currentValue.AMT, 0) || 0;
  }, [pharma4]);

  const formattedPharma1 = useMemo(() => {
    return pharma1?.map((item) => {
      return {
        ...item,
        BMD_DATE: format(new Date(item.BMD_DATE), "dd/MMM/yyyy"),
        AMT: item.AMT?.toLocaleString("en-US", {minimumFractionDigits: 2}),
        TAX: item.TAX?.toLocaleString("en-US", {minimumFractionDigits: 2}),
      };
    });
  }, [pharma1]);

  const formattedPharma4 = useMemo(() => {
    return pharma4?.map((item) => {
      return {
        ...item,
        BMD_DATE: format(new Date(item.DMD_DATE), "dd/MMM/yyyy"),
        AMT: item.AMT?.toLocaleString("en-US", {minimumFractionDigits: 2}),
        TAX: item.TAX?.toLocaleString("en-US", {minimumFractionDigits: 2}),
      };
    });
  }, [pharma4]);

  return (
    <Modal open={!!layout} onClose={() => setLayout(undefined)}>
      <ModalDialog aria-labelledby="layout-modal-title" aria-describedby="layout-modal-description" layout={layout} sx={{backgroundColor: anyHasData ? "lightgrey" : "white", overflow: "auto"}}>
        {anyHasData === false ? (
          <Box></Box>
        ) : (
          <>
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
              <ReportHeader data={state} name="Director Group Wise Sales" hosName={name} disable={true} />
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
                          BillNo#
                        </TableCell>
                        <TableCell padding="none" variant="body" size="small" align="left" sx={{width: "10%", fontWeight: "bolder", fontSize: "12px"}}>
                          Bill Date
                        </TableCell>
                        <TableCell padding="none" variant="body" size="small" align="left" sx={{width: "10%", fontWeight: "bolder", fontSize: "12px", pr: 2}}>
                          PtNo#
                        </TableCell>
                        <TableCell padding="none" variant="body" size="small" align="left" sx={{width: "25%", fontWeight: "bolder", fontSize: "12px", pr: 2}}>
                          Patient Name
                        </TableCell>
                        <TableCell padding="none" variant="body" size="small" align="right" sx={{width: "15%", fontWeight: "bolder", fontSize: "12px", pr: 2}}>
                          Amount
                        </TableCell>
                        <TableCell padding="none" variant="body" size="small" align="right" sx={{width: "15%", fontWeight: "bolder", fontSize: "12px", pr: 2}}>
                          Tax
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow
                        sx={{
                          // backgroundColor: '#BBD8FF',
                          height: "20px",
                        }}
                      >
                        <TableCell align="right" sx={{width: "2%", fontWeight: "bolder", fontSize: "12px"}}></TableCell>
                        <TableCell align="left" colSpan={6} sx={{fontWeight: "bolder", fontSize: "12px", textTransform: "capitalize"}}>
                          Pharmacy Sale
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          backgroundColor: "#BBD8FF",
                          height: "30px",
                        }}
                      >
                        <TableCell align="right" sx={{width: "2%", fontWeight: "bolder", fontSize: "12px"}}></TableCell>
                        <TableCell align="left" colSpan={6} sx={{fontWeight: "bolder", fontSize: "12px", textTransform: "capitalize"}}>
                          Ip Consolidate
                        </TableCell>
                      </TableRow>
                      {formattedPharma4?.map((e, idx) => (
                        <TableRow key={idx}>
                          <TableCell align="right" sx={{width: "2%", textAlign: "center", alignItems: "center"}}>
                            {idx + 1}
                          </TableCell>
                          <TableCell align="left" sx={{width: "10%", fontSize: "12px", textTransform: "capitalize"}}>
                            {e.DM_NO}
                          </TableCell>
                          <TableCell align="left" sx={{width: "10%", fontSize: "12px"}}>
                            {e.DMD_DATE}
                          </TableCell>
                          <TableCell align="left" sx={{width: "10%", fontSize: "12px", pr: 2}}>
                            {e.PT_NO}
                          </TableCell>
                          <TableCell align="left" sx={{width: "25%", fontSize: "12px", pr: 2}}>
                            {e.PTC_PTNAME}
                          </TableCell>
                          <TableCell align="right" sx={{width: "15%", fontSize: "12px", pr: 2}}>
                            {e.AMT}
                          </TableCell>
                          <TableCell align="right" sx={{width: "15%", fontSize: "12px", pr: 2}}>
                            {e.TAX}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow
                        sx={{
                          backgroundColor: "#BBD8FF",
                          height: "30px",
                        }}
                      >
                        <TableCell align="right" sx={{width: "2%", fontWeight: "bolder", fontSize: "12px"}}></TableCell>
                        <TableCell align="left" colSpan={6} sx={{fontWeight: "bolder", fontSize: "12px", textTransform: "capitalize"}}>
                          Direct Billing
                        </TableCell>
                      </TableRow>
                      {formattedPharma1?.map((e, idx) => (
                        <TableRow key={idx}>
                          <TableCell align="right" sx={{width: "2%", textAlign: "center", alignItems: "center"}}>
                            {idx + 1}
                          </TableCell>
                          <TableCell align="left" sx={{width: "10%", fontSize: "12px", textTransform: "capitalize"}}>
                            {e.BM_NO}
                          </TableCell>
                          <TableCell align="left" sx={{width: "10%", fontSize: "12px"}}>
                            {e.BMD_DATE}
                          </TableCell>
                          <TableCell align="left" sx={{width: "10%", fontSize: "12px", pr: 2}}>
                            {e.PT_NO}
                          </TableCell>
                          <TableCell align="left" sx={{width: "25%", fontSize: "12px", pr: 2}}>
                            {e.PTC_PTNAME}
                          </TableCell>
                          <TableCell align="right" sx={{width: "15%", fontSize: "12px", pr: 2}}>
                            {e.AMT}
                          </TableCell>
                          <TableCell align="right" sx={{width: "15%", fontSize: "12px", pr: 2}}>
                            {e.TAX}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell align="right" sx={{width: "2%", textAlign: "center", alignItems: "center"}}></TableCell>
                        <TableCell align="left" sx={{width: "10%", fontSize: "12px", textTransform: "capitalize", color: "black"}}>
                          Total
                        </TableCell>
                        <TableCell align="left" sx={{width: "10%", fontSize: "12px"}}></TableCell>
                        <TableCell align="left" sx={{width: "10%", fontSize: "12px", pr: 2}}></TableCell>
                        <TableCell align="left" sx={{width: "25%", fontSize: "12px", pr: 2}}></TableCell>
                        <TableCell align="right" sx={{width: "15%", fontSize: "12px", pr: 2}}>
                          {(totalAmountOne + totalAmounTwo)?.toLocaleString("en-US", {minimumFractionDigits: 2})}
                        </TableCell>
                        <TableCell align="right" sx={{width: "15%", fontSize: "12px", pr: 2}}></TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
              </Box>
            </Paper>
          </>
        )}
      </ModalDialog>
    </Modal>
  );
};

export default memo(PharmacyReoprtModal);
